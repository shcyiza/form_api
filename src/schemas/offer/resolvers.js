const {OfferModel} = require("../../models/index");

const Offer = {};

const OffersQr = {
    Offers() {
        return OfferModel.find({company: null}).exec();
    },
};

module.exports = {
    Offer,
    OffersQr,
};
