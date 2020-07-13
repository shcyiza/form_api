const {Login} = require("../../utils/akti");
const logger = require("../../utils/logger");
const {AUTHORIZED_USER} = require("../../utils/constances");
const {UserModel} = require("../../models/index");
// FIXME [IJP] 2019-08-18: should avoid this dependency if possible
const {makeUserSessionToken, makeAdminToken} = require("../../utils/jwt");

const {
    STATUS,
    composeClaimKey,
    onNoUserFound,
    onError,
    delTokenToClaim,
    operateTokenToClaim,
} = require("./helpers");

const RequestUserSessionMttn = {
    async RequestUserSession(parent, {email}, {redis}) {
        try {
            const claimed_user = await UserModel.findOne({email});

            onNoUserFound(claimed_user);

            return operateTokenToClaim(redis, claimed_user);
        } catch (err) {
            onError(err);
        }
    },
};

const ClaimUserSessionMttn = {
    ClaimUserSession(parent, {email, request_timestamp, claim_token}, {redis}) {
        return UserModel.findOne({email})
            .then(user => {
                onNoUserFound(user);

                const {id, akti_account_id, akti_contact_id} = user;
                const key = composeClaimKey(id, request_timestamp);

                return redis.get(key).then(token_to_claim => {
                    if (token_to_claim === claim_token) {
                        delTokenToClaim(redis, key, () => {
                            logger.debug(
                                `Successfull claim from ${email} token to claim deleted.`,
                            );
                        });

                        return {
                            status: STATUS[1],
                            user_session_token: makeUserSessionToken(
                                id,
                                akti_account_id,
                                akti_contact_id,
                            ),
                        };
                    }

                    delTokenToClaim(redis, key, resp => {
                        logger.warn(
                            `Invalid login claim made for ${email} ${
                                resp ? "refreshing" : "creating new"
                            } token to claim.`,
                        );
                    });

                    const passed_status = {
                        status: STATUS[2],
                        msg: "Invalide token, please try again",
                    };

                    return operateTokenToClaim(redis, user, passed_status);
                });
            })
            .catch(err => {
                onError(err);
            });
    },
};

const LoginAdminMttn = {
    // The JWT is alreday parsed and set in req.user
    // as documented here: https://github.com/auth0/express-jwt
    async LoginAdmin(parent, {username, password}) {
        try {
            if (!AUTHORIZED_USER.includes(username)) {
                throw new Error("Unauthorized admin request!");
            }

            const token_request = await Login(username, password);
            const token = token_request.data.data.token;

            return {
                status: STATUS[1],
                user_session_token: makeAdminToken(token, username),
            };
        } catch (err) {
            onError(err);
        }
    },
};

module.exports = {RequestUserSessionMttn, ClaimUserSessionMttn, LoginAdminMttn};
