const {createAddress} = require("../../utils/akti");

const {AddressModel} = require("../../models/index");
const {onError} = require("../../utils/utils");
const logger = require("../../utils/logger");

const RegisterUserAddressMttn = {
    async RegisterUserAddress(parent, args, {req}) {
        try {
            const akti_address = await createAddress(req.user.account_id, args);
            const akti_address_id = akti_address.data.data.addressId;

            const address = new AddressModel({
                ...args,
                localisable: req.user.user_id,
                localisable_type: "User",
                akti_address_id,
            });

            return address.save().then(resp => {
                logger.info(
                    `new Address id:${args.street} Registered successfully`,
                );
                return resp;
            });
        } catch (err) {
            onError(err);
        }
    },
};

const UpdateUserAddressMttn = {
    UpdateUserAddress: function(parent, {id, ...updated}, {req}) {
        const filter = {
            _id: id,
            localisable: req.user.user_id,
        };

        return AddressModel.findOneAndUpdate(filter, {...updated}, {new: true})
            .then(address => {
                logger.info(
                    `model Address successful: ${id} Updated successfully`,
                );
                return address;
            })
            .catch(err => {
                onError(err);
            });
    },
};

module.exports = {RegisterUserAddressMttn, UpdateUserAddressMttn};
