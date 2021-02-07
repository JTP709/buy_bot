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

module.exports = reTryClick;
