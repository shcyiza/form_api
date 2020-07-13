const {gql} = require("apollo-server-express");

const PUBLIC_USER_TYPE = gql`
    type User {
        id: ID!
        first_name: String!
        last_name: String!
        email: String!
        phone: String!
    }
`;

const PRIVATE_USER_TYPE = gql`
    type User {
        id: ID!
        first_name: String!
        last_name: String!
        email: String!
        phone: String!
        cars: [Car]
        addresses: [Address]
    }
`;

const USER_QR = gql`
    extend type Query {
        User(email: String, id: String): User
    }
`;

const AUTH_USER_QR = gql`
    extend type Query {
        AuthUser: User
    }
`;

const REGISTER_USER_MTTN = gql`
    extend type Mutation {
        RegisterUser(
            first_name: String!
            last_name: String!
            email: String!
            phone: String!
        ): User!
    }
`;

module.exports = {
    PUBLIC_USER_TYPE,
    PRIVATE_USER_TYPE,
    USER_QR,
    AUTH_USER_QR,
    REGISTER_USER_MTTN,
};
