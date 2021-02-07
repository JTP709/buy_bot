Make sure you have your default credit card set up as well as a default shipping address.

The bot will press the "Place Order" button, but won't be able to verify if the order was completed.

If it can successfully select the button, it will assume the order was complete and shut down.

To Install
Change directory to your the project directory.
Type `node install -g` in your terminal.

To Run
There are two ways to input user data: Command Line inputs, or saving the data in the `user_config.json`

To run with command line inputs:
Type `buy_bot -t` in the terminal to run in TEST mode.
Answer the questons.
Let it do it's thing - the system output in the terminal will let you know what's going on, but it will not place the order. Look for 'IN TEST MODE - OPERATION COMPLETE - ORDER NOT PLACED' to verify the everything works. Make sure you give it an item that is in stock. It will also use a `000` security code for added safety.
Now for the real things - type `buy_bot`, answer the questions, and let it do it's thing.

Monitor the terminal output to see what's going on. You may need to restart if necessary.

To run with saved user data:
Rename `_user_config.json` to `user_config.json`.
Add your user information into the value fields of the json file, for example:
```
{
    "item": "https://www.bestbuy.com/site/apple-ipad-air-latest-model-with-wi-fi-64gb-sky-blue/5985620.p?skuId=5985620",
    "email": "jondoe@gmail.com",
    "password": "@veryg00dp@ssw0rd",
    "code": "333"
}
```
Note: the "code" field is your CC security code.
Type `buy_bot -u -t` in your terminal.
Let it do it's thing - the system output in the terminal will let you know what's going on, but it will not place the order. Look for 'IN TEST MODE - OPERATION COMPLETE - ORDER NOT PLACED' to verify the everything works. Make sure you give it an item that is in stock. It will also use a `000` security code for added safety.
Now for the real things - type `buy_bot -u` and let it do it's thing.

Monitor the terminal output to see what's going on. You may need to restart if necessary.

TODO

add CLI arg for browser type

QUESTIONS

should run in headless mode or not?
