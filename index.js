const repl = require('repl');

function getRandomNumber() {
    return Math.random()
}

function initializeContext(context) {
    context.getRandomNumber = getRandomNumber;
}

const replServer = repl.start();
initializeContext(replServer.context);

replServer.on('reset', initializeContext);