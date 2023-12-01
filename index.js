import puppeteer from 'puppeteer'

async function loginAndExtractFirstJobTitle (email, password) {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  await login(page, email, password)

  await page.waitForTimeout(10000) // Adjust this timing if needed

  await page.goto('https://www.upwork.com/search/jobs/')
  // await page.waitForSelector('.job-tile-header', { timeout: 3000000 })
  // console.log('waited for selector data')
  //
  // const firstJobTitle = await page.$eval('.job-tile-header', (element) => element.textContent.trim())
  // console.log('First job title:', firstJobTitle)

  // await page.waitForTimeout(5000)
  await page.waitForSelector('.search-bar input')
  console.log('allegedly found input')
  const searchInput = await page.$('.search-bar input')
  await searchInput.focus()
  await page.waitForTimeout(2000)
  await page.type('.search-bar input', 'react')
  await page.waitForTimeout(2000)

  await page.keyboard.press('Enter')
  await page.click('body')
  const button = await page.$('button[data-test="filters-modal-open"]')
  button.click()

  await page.waitForTimeout(30000000)

  await browser.close()
}

loginAndExtractFirstJobTitle('piliponful2', 'MySoulIsBlack19')

const login = async (page, email, password) => {
  await page.goto('https://www.upwork.com/ab/account-security/login')

  await page.waitForSelector('input[name="login[username]"]')
  await page.type('input[name="login[username]"]', email)
  await page.click('button#login_password_continue')

  await page.waitForSelector('input[name="login[password]"]')
  await page.type('input[name="login[password]"]', password)
  await page.waitForSelector('button#login_control_continue')
  await page.evaluate(() => {
    document.querySelector('button#login_control_continue').click()
  })
}
