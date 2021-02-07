const { until } = require('selenium-webdriver');
const args = require('../config/args');

const retryType = async (driver, selector, input, keypress, tries = 10, ) => {
    // if (args.devmode) console.log('re', { driver, selector, tries })
    let isComplete = false;
    let attempts = 0;

    while (!isComplete) {
        try {
            attempts += 1;
            if (args.devmode) console.log(`Type Attempt ${attempts}`)
            await driver.wait(until.elementLocated(selector), 10 * 1000);
            const element = await driver.findElement(selector)
            if (keypress) {
                await element.sendKeys(input, keypress);
            } else {
                await element.sendKeys(input);
            }
            isComplete = true;
        } catch(e) {
            if (attempts < tries) {
                await driver.sleep(1000);
                continue
            } else {
                isComplete = true;
                console.error(e)
                throw new Error(`Could not type in input after ${tries} attempts.`);
            }
        }
    }
}

module.exports = retryType;
