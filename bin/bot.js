const {Builder, By, Key, until} = require('selenium-webdriver');

const cartPage = 'https://www.bestbuy.com/cart';
const SELECTORS = {
    CLASS: {
        ADD_TO_CART_BUTTON: By.className('add-to-cart-button'),
        ADDED_TO_CART_MODAL: By.className('added-to-cart'),
        CHECKOUT_BUTTON: By.className('btn btn-lg btn-block btn-primary'),
        SIGN_IN_PAGE_HEADER: By.className('cia-section-title c-section-title heading-5 v-fw-regular'),
    },
    NAME: {
        EMAIL_INPUT: By.name('fld-e'),
        PASSWORD_INUPT: By.name('fld-p1')
    },
    ID: {
        SECURITY_CODE_INPUT: By.id('credit-card-cvv'),
    }
};

const reTryClick = async (driver, selector, tries = 5) => {
    let wasClicked = false;
    let attempts = 0;

    while (!wasClicked) {
        try {
            attempts += 1;
            await driver.findElement(selector).click();
            wasClicked = true
        } catch {
            if (attempts < tries ) continue
            console.log('Could not click on button');
        }
    }
}

async function buyBot(userInfo, options) {
    const { item, email, password, code } = userInfo;
    const { maxAttempts, test: isTestMode, devmode: isDevMode } = options;
    let isComplete = false;
    let attempts = 0;

    if (isDevMode) {
        console.log('User Input: ', { ...userInfo });
        console.log('CLI Args: ', { ...options });
    }

    const driver = await new Builder().forBrowser('firefox')
        .build()

    while (!isComplete) {
        try {
            attempts += 1;
            // Navigate to item page
            await driver.get(item);
            console.log('Navigated to item page');

            // Add item to cart
            await reTryClick(driver, SELECTORS.CLASS.ADD_TO_CART_BUTTON);
            console.log('Item is in stock');

            await driver.sleep(3000)
            const currentLocation = await driver.getCurrentUrl();

            if (currentLocation !== cartPage) {
                // Wait until Added to Cart Modal is visible
                await driver.wait(until.elementLocated(SELECTORS.CLASS.ADDED_TO_CART_MODAL), 10 * 1000);
                console.log('Added to Cart');
                
                // Navigate to /cart page
                await driver.get(cartPage);
            }

            console.log('Navigated to Cart Page');

            // Click Checkout
            await reTryClick(driver, SELECTORS.CLASS.CHECKOUT_BUTTON);
            console.log('Beginning Checkout');

            // Wait until Checkout Page has Loaded
            await driver.wait(until.elementLocated(SELECTORS.CLASS.SIGN_IN_PAGE_HEADER), 10 * 1000);
            console.log('Navigated to Checkout Page');

            // Signin
            await driver.wait(until.elementLocated(SELECTORS.CLASS.SIGN_IN_PAGE_HEADER), 10 * 1000);
            await driver.findElement(SELECTORS.NAME.EMAIL_INPUT).sendKeys(email);
            await driver.findElement(SELECTORS.NAME.PASSWORD_INUPT).sendKeys(password, Key.RETURN);
            console.log('Sign In Complete');

            // Complete Purchase
            await driver.wait(until.elementLocated(SELECTORS.ID.SECURITY_CODE_INPUT), 10 * 1000);
            await driver.findElement(SELECTORS.ID.SECURITY_CODE_INPUT).sendKeys(code);
            
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
