const {CompanyModel, AddressModel, OfferModel} = require("../../models/index");
const {onError} = require("../../utils/utils");

const Company = {
    async addresses({id}) {
        return await AddressModel.find({
            localisable: id,
            localisable_type: "Company",
        }).exec();
    },
    async offers({id}) {
        return await OfferModel.find({company: id}).exec();
    },
    account_id({akti_account_id}) {
        return akti_account_id;
    },
};

const CompanyQr = {
    async Company(parent, {code_name, id}) {
        try {
            const qr = {};

            if (code_name) {
                qr.code_name = code_name;
            }
            if (id) {
                qr._id = id;
            }

            return await CompanyModel.findOne(qr);
        } catch (err) {
            onError(err);
        }
    },
};

module.exports = {Company, CompanyQr};
