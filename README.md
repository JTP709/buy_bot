# Instructions

## Prepare
Make sure you have your default credit card set up as well as a default shipping address. This bot will not set shipping location, delivery times, or change payment options.

This currently only works for BestBuy.com, Walmart.com, or Amazon.com.

This bot currently only works using the Firefox browser.

You'll also need `node.js` installed, and `yarn` package manager is recommended.

Node instructions: https://nodejs.org/en/

Yarn: https://yarnpkg.com/

## Instructions

The bot will press the "Place Order" button, but won't be able to verify if the order was completed.

If it can successfully select the button, it will assume the order was complete and shut down.

The bot will detect what retailer you're using.

### To Install
From your terminal:
1. Download or use `git clone`
2. Change directory to your the project directory.
3. Type `node install -g` or `yarn install -g` in your terminal.

### To Run
There are two ways to input user data: Command Line inputs, or saving the data in the `user_config.json`

#### To run with command line inputs:
1. Type `buy_bot -t` in the terminal to run in TEST mode.
2. Answer the questons.
3. Let it do it's thing - the system output in the terminal will let you know what's going on, but it will not place the order. 
Look for 'IN TEST MODE - OPERATION COMPLETE - ORDER NOT PLACED' to verify the everything works. Make sure you give it an item that is in stock. 
It will also use a `000` security code for added safety.
4. Now for the real things - type `buy_bot`, answer the questions, and let it do it's thing.

Monitor the terminal output to see what's going on. You may need to restart if necessary.

#### To run with saved user data:
1. Rename `_user_config.json` to `user_config.json`.
2. Add your user information into the value fields of the json file, for example:
```
{
    "item": "https://www.bestbuy.com/site/apple-ipad-air-latest-model-with-wi-fi-64gb-sky-blue/5985620.p?skuId=5985620",
    "email": "jondoe@gmail.com",
    "password": "@veryg00dp@ssw0rd",
    "code": "333"
}
```
Note: the "code" field is your CC security code.

3. You need to reinstall the bot so it pulls in the new config info, type `npm install -g` or `yarn install -g`.
4. Type `buy_bot -u -t` in your terminal.
5. Let it do it's thing - the system output in the terminal will let you know what's going on, but it will not place the order. Look for 'IN TEST MODE - OPERATION COMPLETE - ORDER NOT PLACED' to verify the everything works. Make sure you give it an item that is in stock. It will also use a `000` security code for added safety.
6. Now for the real things - type `buy_bot -u` and let it do it's thing.

### As the bot is running:
Monitor the terminal output to see what's going on. You may need to restart if necessary.

Warning: If the order fails after adding to cart, the bot will stop but you will need to remove items from the cart.

### For Walmart Items
Walmart has implemented various things to fight bots. I recommend running the bot in Dev mode so it runs in a browser. This will allow you to click captchas and other changes to the checkout flow as necessary.

## Flag Arguments

`-u` or `--userconfig` Runs with user information from `user_config.json`

`-t` or `--test` Runs in Test Mode with additinoal logs and will use invalid security code and not place the order.

`-d` or `--devmode` Runs in developer mode with additional logs.

`-a [number]` or `--attempts [number]` Will only run the script n number of times. Set to `-1` to run infinite times. Warning: I have no idea what bugs/issues this might cause and advise you actively monitor the console.
