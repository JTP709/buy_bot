const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
  
const questionBuilder = (question, field, userInfo) => {
    return new Promise((resolve, reject) => {
        rl.question(question, (answer) => {
            if (answer || answer !== '') userInfo[field] = answer;
            resolve();
        });
    });
};

module.exports = { questionBuilder, rl };
