const moment = require("moment");
const logger = require("../../utils/logger");
const {UserMethods} = require("../../models/index");
const {generateDigitToken} = require("../../utils/token_generator");
const {send_sms} = require("../../utils/outbout_communications");

const STATUS = ["pending", "active", "altered"];

const composeClaimKey = (user_id, request_timestamp) =>
    `carjo_api:session_request:${user_id}:${request_timestamp}`;

const onNoUserFound = function(user) {
    UserMethods.errorOnNoUserFound(user, "email");
};

const onError = function(err) {
    logger.error(`User Session request error: ${err.message}`);
    throw err;
};

const delTokenToClaim = function(redis, key, cbOnSuccess) {
    redis
        .del(key)
        .then(cbOnSuccess)
        .catch(err => {
            onError(err);
        });
};

const operateTokenToClaim = (
    redis,
    {id, first_name, phone, email},
    passed_status = {},
) => {
    const request_timestamp = moment().format("YYMMDDHHmmss");
    const key = composeClaimKey(id, request_timestamp);
    const token_to_claim = generateDigitToken(6);

    return redis
        .set(key, token_to_claim, "NX", "EX", 600)
        .then(resp => {
            if (resp) {
                return send_sms(
                    `+${phone}`,
                    `Hey ${first_name}, Your code for Carjo Service is: ${token_to_claim}`,
                )
                    .then(() => {
                        logger.debug(
                            `token to claim for ${email} created at key: ${key}`,
                        );
                        logger.debug(`token to claim for sent to ${email}`);

                        return {
                            status: passed_status.status || STATUS[0],
                            request_timestamp,
                            message: passed_status.msg || null,
                        };
                    })
                    .catch(err => {
                        logger.error(err);
                    });
            }

            const err = new Error(`could not create token for ${email}`);

            onError(err);
        })
        .catch(err => {
            onError(err);
        });
};

module.exports = {
    STATUS,
    composeClaimKey,
    onNoUserFound,
    onError,
    delTokenToClaim,
    operateTokenToClaim,
};
