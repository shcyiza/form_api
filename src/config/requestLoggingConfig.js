const morgan = require("morgan");
const logger = require("../utils/logger");
const morganConfig = {
    getMiddleware: function () {
        // logger middleware
        morgan.token("body", req => {
            return (
                req.body &&
                JSON.stringify(req.body)
                    .replace(/[{}\n]/g, "")
                    .replace(/\"/g, "'")
                    .replace(/\\n/g, "'")
                    .replace(/[ ]{1,}/g, " ")
            );
        });

        return morgan(
            "method=:method - url=:url - response-time=:response-time - graphQL-body= :body \n",
            {stream: logger.stream},
        );
    }
};

module.exports = morganConfig;