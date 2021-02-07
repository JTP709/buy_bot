const { Builder, By, Key, until } = require('selenium-webdriver');
const args = require("../config/args");
const firefox = require('selenium-webdriver/firefox');
const { GAMESTOP } = require('../selectors');
const reTryClick = require('../helpers/retryClick');

const gameStopBot = async (userInfo) => {
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
            console.log(`Navigated to ${item}`);

            // Add item to cart
            addedToCartComplete = true;
            console.log('Item is in stock');

            // Navigate to cart page
            console.log('Added to Cart');
            console.log(`Navigated to ${cartPage}`);

            // Click Checkout
            console.log('Beginning Checkout');

            console.log('Navigated to Checkout Page');

            // Sign in
            console.log('Completed Sign In Page');

            // Complete Purchase

            if (isTestMode) {
                console.log('IN TEST MODE - OPERATION COMPLETE - ORDER NOT PLACED')
            } else {
                // await reTryClick(driver, By.css(BEST_BUY.CSS.PLACE_YOUR_ORDER));
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

module.exports = gameStopBot;
