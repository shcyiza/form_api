/* eslint-disable prettier/prettier */
const { makeExecutableSchema } = require('graphql-tools');
const BASE_TYPE = require("../utils/gql_base_type");

const {PRIVATE_USER_TYPE} = require("./user/types");
const {CAR_TYPE, USER_CARS_QR, REGISTER_CAR_MTTN} = require("./car/types");

const {User, cars, addresses} = require("./user/resolvers");
const {Car} = require("./car/resolvers");

const {ADDRESS_TYPE} = require("./address/types");

const {ORDER_TYPES} = require("./order/types");
const {Order} = require("./order/resolvers");

const {OFFER_TYPE, OFFERS_QR} = require("./offer/types");
const {Offer, OffersQr} = require("./offer/resolvers");

const {COMPANY_TYPE} = require("./company/types");

const ClientFormSchema = makeExecutableSchema({
    typeDefs: [
        BASE_TYPE,
        CAR_TYPE,
        ORDER_TYPES,
        PRIVATE_USER_TYPE,
        ADDRESS_TYPE,
        COMPANY_TYPE,
        OFFER_TYPE,
        USER_CARS_QR,
        OFFERS_QR,
        REGISTER_CAR_MTTN,
    ],
    resolvers:  {
        Query: {
            // sign in with AKTI
            // CRUD Offers
            ...OffersQr,
            // CRUD companys
            // RUD orders
        },
        Mutation: {

        },
        User:{...User, cars, addresses},
        Car,
        Order,
        Offer,
    }
});

module.exports = ClientFormSchema;
