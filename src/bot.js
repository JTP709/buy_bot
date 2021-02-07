const {Builder, By, Key, until} = require('selenium-webdriver');
const SELECTORS = require('./selectors');
const reTryClick = require('./helpers/retryClick');

const cartPage = 'https://www.bestbuy.com/cart';

async function buyBot(userInfo, options) {
    if (Object.keys(userInfo).length < 4) {
        console.log('Incomplete User Info');
        return;
    }

    const { item, email, password, code } = userInfo;
    const { maxAttempts, test: isTestMode, devmode: isDevMode } = options;
    let isComplete = false;
    let attempts = 0;

    const driver = await new Builder().forBrowser('firefox')
        .build()

    while (!isComplete) {
        try {
            attempts += 1;
            // Navigate to item page
            await driver.get(item);
            console.log('Navigated to item page');

            // Add item to cart
            await reTryClick(driver, By.className(SELECTORS.CLASS.ADD_TO_CART_BUTTON));
            console.log('Item is in stock');

            await driver.sleep(3000)
            const currentLocation = await driver.getCurrentUrl();

            if (currentLocation !== cartPage) {
                // Wait until Added to Cart Modal is visible
                await driver.wait(until.elementLocated(By.className(SELECTORS.CLASS.ADDED_TO_CART_MODAL)), 10 * 1000);
                console.log('Added to Cart');
                
                // Navigate to /cart page
                await driver.get(cartPage);
            }

            console.log('Navigated to Cart Page');

            // Click Checkout
            await reTryClick(driver, By.className(SELECTORS.CLASS.CHECKOUT_BUTTON));
            console.log('Beginning Checkout');

            // Wait until Checkout Page has Loaded
            await driver.wait(until.elementLocated(By.className(SELECTORS.CLASS.SIGN_IN_PAGE_HEADER)), 10 * 1000);
            console.log('Navigated to Checkout Page');

            // Signin
            await driver.wait(until.elementLocated(By.className(SELECTORS.CLASS.SIGN_IN_PAGE_HEADER)), 10 * 1000);
            await driver.findElement(By.name(SELECTORS.NAME.EMAIL_INPUT)).sendKeys(email);
            await driver.findElement(By.name(SELECTORS.NAME.PASSWORD_INUPT)).sendKeys(password, Key.RETURN);
            console.log('Sign In Complete');

            // Complete Purchase
            await driver.wait(until.elementLocated(By.id(SELECTORS.ID.SECURITY_CODE_INPUT)), 10 * 1000);
            await driver.findElement(By.id(SELECTORS.ID.SECURITY_CODE_INPUT)).sendKeys(code);
            
            if (!isTestMode) {

            } else {
                console.log('IN TEST MODE - ORDER NOT PLACED')
            }
            await driver.sleep(10000);
            isComplete = true;
        } catch(e) {
            console.error(e)
            console.log('Error - Bot restarting')
            if (maxAttempts !== attempts) {
                continue
            } else {
                isComplete = true;
            }
        }
    }

    if (!isTestMode) console.log('Purchase Complete')
    await driver.quit();
};

module.exports = buyBot;
