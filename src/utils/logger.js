// FIXME [IJP] 2019-08-18: leave in a conf
const winston = require("winston");

winston.emitErrs = true;

const logger = new winston.Logger({
    transports: [
        new winston.transports.Console({
            timestamp: true,
            level: "debug",
            handleExceptions: true,
            json: false,
            colorize: true,
        }),
    ],
    exitOnError: false,
});

logger.stream = {
    write: message => logger.debug(message.replace(/\n$/, "")),
};

module.exports = logger;
