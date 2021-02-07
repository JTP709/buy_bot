#!/usr/bin/env node
const buyBot = require('../src/bot');
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
    buyBot(userInfo, args);
}

main();
