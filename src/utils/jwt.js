const Jwt = require("jsonwebtoken");

const makeUserSessionToken = function(user_id, account_id, contact_id) {
    return Jwt.sign(
        {user_id, account_id, contact_id},
        process.env.JWT_CLIENT_FORM_SECRET,
        {
            expiresIn: "2h",
        },
    );
};

const makeAdminToken = function(admin_token, email) {
    return Jwt.sign({admin_token, email}, process.env.JWT_CLIENT_FORM_SECRET);
};

const makePaymentUrlToken = function(order_id) {
    return Jwt.sign({order_id}, process.env.JWT_STRIPE_CHARGE);
};

const decodePaymentUrlToken = function(token) {
    try {
        return Jwt.verify(token, process.env.JWT_STRIPE_CHARGE);
    } catch (err) {
        throw err;
    }
};

module.exports = {
    makeUserSessionToken,
    makeAdminToken,
    makePaymentUrlToken,
    decodePaymentUrlToken,
};
