const { Builder, By, Key, until } = require('selenium-webdriver');
const args = require("../config/args");
const firefox = require('selenium-webdriver/firefox');
const { AMAZON } = require('../selectors');
const retryClick = require('../helpers/retryClick');
const retryType = require('../helpers/retryType');

const amazonBot = async (userInfo) => {
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
            await retryClick(driver, By.id(AMAZON.ID.BUY_NOW_BUTTON));
            addedToCartComplete = true;
            console.log('Item is in stock');

            // Sign in
            await driver.wait(until.elementLocated(By.name(AMAZON.NAME.EMAIL_INPUT)), 10 * 1000);
            await retryType(driver, By.name(AMAZON.NAME.EMAIL_INPUT), email, Key.RETURN);
            await driver.wait(until.elementLocated(By.name(AMAZON.NAME.PASSWORD_INPUT)), 10 * 1000);
            await retryType(driver, By.name(AMAZON.NAME.PASSWORD_INPUT), password, Key.RETURN);
            console.log('Completed Sign In Page');

            // Click Checkout
            console.log('Beginning Checkout');

            // Complete Purchase
            if (isTestMode) {
                console.log('IN TEST MODE - OPERATION COMPLETE - ORDER NOT PLACED')
            } else {
                await driver.sleep(6000)
                await retryClick(driver, By.name(AMAZON.NAME.PLACE_YOUR_ORDER_BUTTON));
                await driver.sleep(10000);
                if (!(await driver.getCurrentUrl()).includes('thankyou')) {
                    isComplete = true;
                    throw new Error('Did not arrive at Order Confirmation Page, check your account order history.')
                } else {
                    console.log('Order complete, shutting down...');
                }
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

module.exports = amazonBot;
