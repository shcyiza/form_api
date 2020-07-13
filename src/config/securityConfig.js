const jwtMiddleware = require("express-jwt");
const logger = require("../utils/logger");
const {AUTHORIZED_USER} = require("../utils/constances");

const securityFilter = {
    jwtFilter: jwtMiddleware({secret: process.env.JWT_CLIENT_FORM_SECRET}),
    adminFilter(req, res) {
        const {
            user: {admin_token, email},
            originalUrl: path,
        } = req;

        if (!admin_token && !AUTHORIZED_USER.includes(email)) {
            res.statusCode = 401;
            res.send({message: "Unauthorized", status: 401});
            logger.warn(`POST ${path} received an unauthorized request.`);
            throw new Error(`POST ${path} received an unauthorized request.`);
        }
    },
    authenticationErrorFilter(path) {
        return (err, req, res, next) => {
            if (err.name === "UnauthorizedError") {
                res.statusCode = 401;
                res.send({message: "Unauthorized", status: 401});
                logger.warn(`POST ${path} received an unauthorized request.`);
                throw new Error(
                    `POST ${path} received an unauthorized request.`,
                );
            }
            next();
        };
    },
};

module.exports = securityFilter;
