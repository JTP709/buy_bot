const { Builder, By, Key, until } = require('selenium-webdriver');
const args = require("../config/args");
const firefox = require('selenium-webdriver/firefox');
const { WALMART } = require('../selectors');
const retryClick = require('../helpers/retryClick');

const walmartBot = async (userInfo) => {
    console.log('Bot starting...');
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
    let addedToCartComplete = false;
    let isComplete = false;
    let attempts = 0;

    if (isTestMode) console.log('IN TEST MODE');
    if (isDevMode) console.log('IN DEV MODE');
    if (maxAttempts > -1) console.log(`Will attempt ${maxAttempts} times.`);

    const options = new firefox.Options();
    if (!isDevMode) options.addArguments('-headless');
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
            await retryClick(driver, By.css(WALMART.CSS.ADD_TO_CART_BUTTON));
            addedToCartComplete = true;
            console.log('Item is in stock');

            // Click Checkout
            await driver.wait(until.elementLocated(By.css(WALMART.CSS.CHECKOUT_BUTTON)));
            console.log('Added to Cart');
            await retryClick(driver, By.css(WALMART.CSS.CHECKOUT_BUTTON))
            console.log('Beginning Checkout');

            // Sign in
            await driver.wait(until.elementLocated(By.name(WALMART.NAME.EMAIL_INPUT_NAME)), 10 * 1000);
            await driver.findElement(By.name(WALMART.NAME.EMAIL_INPUT_NAME)).sendKeys(email);
            await driver.findElement(By.name(WALMART.NAME.PASSWORD_INPUT_NAME)).sendKeys(password, Key.RETURN);
            console.log('Completed Sign In');

            // Confirm Delivery
            await retryClick(driver, By.css(WALMART.CSS.FULFILLMENT_CONTINUE_BUTTON));
            console.log('Confirmed Fulfillment Option');

            // Confirm Address
            await retryClick(driver, By.css(WALMART.CSS.ADDRESS_CONTINUE_BUTTON));
            console.log('Confirmed Addres');

            // Confirm Payment
            await driver.wait(until.elementLocated(By.name(WALMART.NAME.SECURITY_CODE_INPUT_ID)), 10 * 1000);
            await driver.findElement(By.name(WALMART.NAME.SECURITY_CODE_INPUT_ID)).sendKeys(!isTestMode ? code : '0000');
            await retryClick(driver, By.css(WALMART.CSS.REVIEW_ORDER_BUTTON));
            console.log('Confirmed Payment Method');

            // Complete Purchase
            if (isTestMode) {
                console.log('IN TEST MODE - OPERATION COMPLETE - ORDER NOT PLACED')
            } else {
                await retryClick(driver, By.css(WALMART.CSS.PLACE_ORDER_BUTTON));
                console.log('Order complete, shutting down...');
            }

            if (isDevMode) await driver.sleep(10000);
            if (!isTestMode) console.log('Purchase Complete');
            isComplete = true;
        } catch (e) {
            console.error(e);
            if (attempts === maxAttempts) {
                isComplete = true;
                console.log(`Reached max number of attempts (${maxAttempts}), shutting down...`);
            } else if (addedToCartComplete) {
                isComplete = true;
                console.log('ERROR - Added to cart, but could not complete order.');
            } else {
                console.log('ERROR - Bot restarting')

                continue
            }
        }
    }

    await driver.quit();
};

module.exports = walmartBot;
