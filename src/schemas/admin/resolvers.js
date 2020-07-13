const AuthUserQr = {
    // The JWT is alreday parsed and set in req.user
    // as documented here: https://github.com/auth0/express-jwt
    async AuthUser(parent, args, {req}) {
        try {
            let user = await UserModel.findOne({_id: req.user.user_id});

            if (user) {
                return user;
            }
            return null;
        } catch (err) {
            onError(err);
        }
    },
};

module.exports = {User, cars, addresses, UserQr, RegisterUserMttn, AuthUserQr};