#!/usr/bin/env node
const bestBuyBot = require('../src/bots/bestBuyBot');
const walmartBot = require('../src/bots/walmartBot');
const gameStopBot = require('../src/bots/gameStopBot');
const args = require('../src/config/args');
const { questionBuilder, rl } = require('../src/helpers/questionBuilder');
const defaultUserInfo = require('../user_config.json');

const main = async () => {
    const userInfo = (args.userconfig && defaultUserInfo) ? defaultUserInfo : {};

    if (args.devmode) {
        console.log('User Input: ', { ...userInfo });
        console.log('CLI Args: ', { ...args });
    }

    if (!args.userconfig) {
        await questionBuilder('What do you want to buy (input full Best Buy url)?\n', 'item', userInfo);
        await questionBuilder('What is your Best Buy account email?\n', 'email', userInfo);
        await questionBuilder('What is your Best Buy account password?\n', 'password', userInfo);
        await questionBuilder('What is your CC security code?\n', 'code', userInfo);
    }

    rl.close();

    if (userInfo.item.includes('bestbuy.com')) {
        bestBuyBot(userInfo);
    } else if (userInfo.item.includes('walmart.com')) {
        walmartBot(userInfo);
    // } else if (userInfo.item.includes('gamestop.com')) {
    //     gameStopBot(userInfo);
    } else {
        console.log('The Bot does not support that retailer, sorry.', '\nShutting down...')
    }
}

main();
