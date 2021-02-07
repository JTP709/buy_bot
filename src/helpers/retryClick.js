const { until } = require('selenium-webdriver');
const args = require('../config/args');

const reTryClick = async (driver, selector, tries = 10) => {
    // if (args.devmode) console.log('retryClick', { driver, selector, tries })
    let isComplete = false;
    let attempts = 0;

    while (!isComplete) {
        try {
            attempts += 1;
            if (args.devmode) console.log(`Click Attempt ${attempts}`)
            await driver.wait(until.elementLocated(selector));
            await driver.findElement(selector).click();
            isComplete = true;
        } catch(e) {
            if (attempts < tries) {
                await driver.sleep(1000);
                continue
            } else {
                isComplete = true;
                console.error(e)
                throw new Error(`Could not click on button after ${tries} attempts.`);
            }
        }
    }
}

module.exports = reTryClick;
