const { Builder, By, Key, until } = require('selenium-webdriver');
const args = require('../config/args');
const firefox = require('selenium-webdriver/firefox');
const SELECTORS = require('../selectors');
const reTryClick = require('../helpers/retryClick');

const cartPage = 'https://www.bestbuy.com/cart';

const buyBot = async (userInfo) => {
    console.log('Bot starting...')
    if (Object.keys(userInfo).length < 4) {
        console.log('Incomplete User Info - check your inputs or config and try again');
        return;
    }

    const { item, email, password, code } = userInfo;
    const {
        attempts: maxAttempts,
        test: isTestMode,
        devmode: isDevMode
    } = args;
    let isComplete = false;
    let attempts = 0;

    if (isTestMode) console.log('IN TEST MODE');
    if (isDevMode) console.log('IN DEV MODE');
    if (maxAttempts > -1) console.log(`Will attempt ${maxAttempts} times.`);

    const options = new firefox.Options();
    if (args.devmode) options.addArguments('-headless');
    const driver = await new Builder().forBrowser('firefox')
        .setFirefoxOptions(options)
        .build()

    while (!isComplete) {
        try {
            attempts += 1;
            // Navigate to item page
            await driver.get(item);
            console.log(`Navigated to ${item}`);

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

            console.log(`Navigated to ${cartPage}`);

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
            console.log('Completed Sign In Page');

            // Complete Purchase
            await driver.wait(until.elementLocated(By.id(SELECTORS.ID.SECURITY_CODE_INPUT)), 10 * 1000);
            await driver.findElement(By.id(SELECTORS.ID.SECURITY_CODE_INPUT)).sendKeys(!isTestMode ? code : '000');
            
            if (isTestMode) {
                console.log('IN TEST MODE - OPERATION COMPLETE - ORDER NOT PLACED')
            } else {
                await reTryClick(driver, By.css(SELECTORS.CSS.PLACE_YOUR_ORDER));
                console.log('Order complete, shutting down...');
            }

            if (isDevMode) await driver.sleep(10000);

            if (!isTestMode) console.log('Purchase Complete');

            isComplete = true;
        } catch(e) {
            console.error(e)
            if (attempts === maxAttempts) {
                isComplete = true;
                console.log(`Reached max number of attempts (${maxAttempts}), shutting down...`);
            } else {
                console.log('Error - Bot restarting')
                continue
            }
        }
    }

    await driver.quit();
};

module.exports = buyBot;
