const {gql} = require("apollo-server-express");

const USER_SESSION_REQUEST_TYPE = gql`
    type UserSessionRequest {
        status: String!
        message: String
        request_timestamp: String
        user_session_token: String
    }
`;

const REQUEST_USER_SESSION_MTTN = gql`
    extend type Mutation {
        RequestUserSession(email: String!): UserSessionRequest
    }
`;

const CLAIM_USER_SESSION_MTTN = gql`
    extend type Mutation {
        ClaimUserSession(
            email: String!
            request_timestamp: String!
            claim_token: String!
        ): UserSessionRequest
    }
`;

const LOGIN_ADMIN_MTTN = gql`
    extend type Mutation {
        LoginAdmin(username: String!, password: String!): UserSessionRequest
    }
`;

module.exports = {
    USER_SESSION_REQUEST_TYPE,
    REQUEST_USER_SESSION_MTTN,
    CLAIM_USER_SESSION_MTTN,
    LOGIN_ADMIN_MTTN,
};
