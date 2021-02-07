const buyBot = require('./bot');
const readline = require('readline');
const yargs = require("yargs");
const defaultUserInfo = require('../user_config.json');

const yargOptions = {
    test: {
        alias: "t",
        describe: "Processes a test order but does not place the order.",
        type: "boolean",
    },
    attempts: {
        alias: "a",
        describe: "Number of attempts (optional).",
        type: "number",
    },
    devmode: {
        alias: "d",
        describe: "Developer mode.",
        type: "boolean",
    },
    useconfig: {
        alias: "u",
        describe: "Use user_config data instead of user input.",
        type: "boolean",
    }
};

const options = yargs
    .usage("Usage: -t <test>")
    .option(yargOptions)
    .default({
        test: false,
        attempts: -1,
        devmode: false,
        userconfig: false,
    })
    .argv;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const userInfo = options.userconfig ? defaultUserInfo : {}

const questionBuilder = (question, field, muted = false) => {
    return new Promise((resolve, reject) => {
        rl.question(question, (answer) => {
            rl.stdoutMuted = muted;
            if (answer || answer !== '') userInfo[field] = answer;
            resolve();
        });
    });
};

const main = async () => {
    await questionBuilder('What do you want to buy (input full Best Buy url)? ', 'item');
    await questionBuilder('What is your Best Buy account email? ', 'email');
    await questionBuilder('What is your Best Buy account password?', 'password', true);
    await questionBuilder('What is your CC security code? ', 'code');
    rl.close();
    buyBot(userInfo, options);
}

main();
