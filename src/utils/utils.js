const logger = require("./logger");

const onError = function(err) {
    logger.error(`User request error: ${err.message}`);
    throw err;
};

module.exports = {onError};
