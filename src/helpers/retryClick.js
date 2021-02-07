const { until } = require('selenium-webdriver');

const reTryClick = async (driver, selector, tries = 10) => {
    let isComplete = false;
    let error;
    let attempts = 0;

    while (!isComplete) {
        try {
            attempts += 1;
            await driver.wait(until.elementLocated(selector));
            await driver.findElement(selector).click();
        } catch(e) {
            if (attempts < tries) continue
            error = e;
        }

        isComplete = true;

        if (error) {
            console.error(error);
            throw new Error(`Could not click on button after ${tries} attempts.`);
        }
    }
}

module.exports = reTryClick;
