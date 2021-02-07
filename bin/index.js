#!/usr/bin/env node
const buyBot = require('../src/bot');
const args = require('../src/config/args');
const { questionBuilder, rl } = require('../src/helpers/questionBuilder');
const defaultUserInfo = require('../user_config.json');

const main = async () => {
    if (args.isDevMode) {
        console.log('User Input: ', { ...userInfo });
        console.log('CLI Args: ', { ...args });
    }

    const userInfo = (args.userconfig && defaultUserInfo) ? defaultUserInfo : {};

    if (!args.userconfig) {
        await questionBuilder('What do you want to buy (input full Best Buy url)? ', 'item', userInfo);
        await questionBuilder('What is your Best Buy account email? ', 'email', userInfo);
        await questionBuilder('What is your Best Buy account password?', 'password', userInfo);
        await questionBuilder('What is your CC security code? ', 'code', userInfo);
    }

    rl.close();
    buyBot(userInfo, args);
}

main();
