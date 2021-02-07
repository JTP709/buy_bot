const yargs = require("yargs");

const options = {
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
    userconfig: {
        alias: "u",
        describe: "Use user_config data instead of user input.",
        type: "boolean",
    }
};

const args = yargs
    .usage("Usage: -t <test>")
    .option(options)
    .default({
        test: false,
        attempts: 3,
        devmode: false,
        userconfig: false,
    })
    .argv;

module.exports = args;
