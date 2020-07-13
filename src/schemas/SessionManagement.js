const {makeExecutableSchema} = require("graphql-tools");
const BASE_TYPE = require("../utils/gql_base_type");

const {PUBLIC_USER_TYPE, USER_QR, REGISTER_USER_MTTN} = require("./user/types");
const {
    USER_SESSION_REQUEST_TYPE,
    REQUEST_USER_SESSION_MTTN,
    CLAIM_USER_SESSION_MTTN,
    LOGIN_ADMIN_MTTN,
} = require("./user_session/types");
const {COMPANY_TYPE, COMPANY_QR} = require("./company/types");
const {ADDRESS_TYPE} = require("./address/types");
const {OFFER_TYPE} = require("./offer/types");

const {User, UserQr, RegisterUserMttn} = require("./user/resolvers");
const {
    RequestUserSessionMttn,
    ClaimUserSessionMttn,
    LoginAdminMttn,
} = require("./user_session/resolvers");

const {Company, CompanyQr} = require("./company/resolvers");

const SessionManagement = makeExecutableSchema({
    typeDefs: [
        BASE_TYPE,
        PUBLIC_USER_TYPE,
        OFFER_TYPE,
        COMPANY_TYPE,
        ADDRESS_TYPE,
        USER_QR,
        COMPANY_QR,
        REGISTER_USER_MTTN,
        USER_SESSION_REQUEST_TYPE,
        REQUEST_USER_SESSION_MTTN,
        CLAIM_USER_SESSION_MTTN,
        LOGIN_ADMIN_MTTN,
    ],
    resolvers: {
        Query: {
            ...UserQr,
            ...CompanyQr,
        },
        Mutation: {
            ...RegisterUserMttn,
            ...RequestUserSessionMttn,
            ...ClaimUserSessionMttn,
            ...LoginAdminMttn,
        },
        User,
        Company,
    },
});

module.exports = SessionManagement;
