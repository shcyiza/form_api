/* eslint-disable prettier/prettier */
const { makeExecutableSchema } = require('graphql-tools');
const BASE_TYPE = require("../utils/gql_base_type");

const {PRIVATE_USER_TYPE, AUTH_USER_QR} = require("./user/types");
const {CAR_TYPE, USER_CARS_QR, REGISTER_CAR_MTTN} = require("./car/types");

const {User, cars, addresses, AuthUserQr} = require("./user/resolvers");
const {Car, RegisterCarMttn} = require("./car/resolvers");

const {ADDRESS_TYPE, REGISTER_USER_ADDRESS_MTTN, UPDATE_USER_ADDRESS_MTTN} = require("./address/types");
const {RegisterUserAddressMttn, UpdateUserAddressMttn} = require("./address/resolvers");

const {ORDER_TYPES, USER_ORDER_QR, CHECKOUT_ORDER_MTTN, UPDATE_ORDER_BILLING_MTTN} = require("./order/types");
const {Order, UserOrderQr, CheckoutOrderMttn, UpdateOrderBillingMttn} = require("./order/resolvers");

const {OFFER_TYPE, OFFERS_QR} = require("./offer/types");
const {Offer, OffersQr} = require("./offer/resolvers");

const {COMPANY_TYPE} = require("./company/types");

const {
    PAYMENT_INFO_TYPE, CHARGE_PAYMENT_MTTN, TOKENIZE_CHARGE_INFO_MTTN, GET_CHARGE_INFO_QR, UPDATE_ORDER_PAYMENT_INFO_MTTN
} = require("./payment/types");
const {ChargePaymentMttn, GetChargeInfoQr, TokenizeChargeInfoQr, UpdateOrderPaymentInfoMttn} = require("./payment/resolvers");

const ClientFormSchema = makeExecutableSchema({
    typeDefs: [
        BASE_TYPE,
        CAR_TYPE,
        ORDER_TYPES,
        PRIVATE_USER_TYPE,
        ADDRESS_TYPE,
        COMPANY_TYPE,
        PAYMENT_INFO_TYPE,
        OFFER_TYPE,
        AUTH_USER_QR,
        USER_CARS_QR,
        USER_ORDER_QR,
        OFFERS_QR,
        REGISTER_CAR_MTTN,
        REGISTER_USER_ADDRESS_MTTN,
        UPDATE_USER_ADDRESS_MTTN,
        CHECKOUT_ORDER_MTTN,
        UPDATE_ORDER_BILLING_MTTN,
        CHARGE_PAYMENT_MTTN,
        TOKENIZE_CHARGE_INFO_MTTN,
        UPDATE_ORDER_PAYMENT_INFO_MTTN,
        GET_CHARGE_INFO_QR,
    ],
    resolvers:  {
        Query: {
            ...AuthUserQr,
            ...UserOrderQr,
            ...OffersQr,
            ...TokenizeChargeInfoQr,
            ...GetChargeInfoQr,
        },
        Mutation: {
            ...RegisterCarMttn,
            ...RegisterUserAddressMttn,
            ...UpdateUserAddressMttn,
            ...CheckoutOrderMttn,
            ...UpdateOrderBillingMttn,
            ...ChargePaymentMttn,
            ...UpdateOrderPaymentInfoMttn,
        },
        User:{...User, cars, addresses},
        Car,
        Order,
        Offer,
    }
});

module.exports = ClientFormSchema;
