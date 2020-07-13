const {UserModel, CarModel, AddressModel} = require("../../models/index");
const {findOrCreateAktiContact} = require("../../utils/akti");
const {onError} = require("../../utils/utils");

// properties resolvers
const User = {};

async function cars({id}) {
    const user_cars = await CarModel.find({user: id}).exec();

    return user_cars || [];
}

async function addresses({id}) {
    return await AddressModel.find({
        localisable: id,
        localisable_type: "User",
    }).exec();
}

// query and mutation resolver
const UserQr = {
    async User(parent, {email, id}) {
        try {
            const qr = {};

            if (email) {
                qr.email = email;
            }
            if (id) {
                qr._id = id;
            }

            let user = await UserModel.findOne(qr);

            if (user) {
                if (!!user.akti_contact_id === false) {
                    const akti_user = await findOrCreateAktiContact(user);

                    return await UserModel.findOneAndUpdate(
                        qr,
                        {akti_contact_id: akti_user.contactId},
                        {new: true},
                    );
                }
            }

            return user;
        } catch (err) {
            onError(err);
        }
    },
};

const RegisterUserMttn = {
    async RegisterUser(parent, args) {
        try {
            let akti_user = await findOrCreateAktiContact(args);
            const akti_contact_id =
                akti_user.contactId || akti_user.data.data.contactId;
            const akti_account_id =
                akti_user.accountId || akti_user.data.data.accountId;

            return await new UserModel({
                ...args,
                akti_contact_id,
                akti_account_id,
            }).save();
        } catch (err) {
            onError(err);
        }
    },
};

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
