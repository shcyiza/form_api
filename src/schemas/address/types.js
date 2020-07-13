const {gql} = require("apollo-server-express");

const ADDRESS_TYPE = gql`
    type Address {
        id: ID!
        street: String!
        city: String!
        zip: String!
        name: String
    }
`;

const REGISTER_USER_ADDRESS_MTTN = gql`
    extend type Mutation {
        RegisterUserAddress(
            country_code: String!
            street: String!
            city: String!
            zip: String!
            name: String
        ): Address
    }
`;

const UPDATE_USER_ADDRESS_MTTN = gql`
    extend type Mutation {
        UpdateUserAddress(
            id: String!
            street: String
            city: String
            zip: String
            name: String
        ): Address!
    }
`;

module.exports = {
    ADDRESS_TYPE,
    REGISTER_USER_ADDRESS_MTTN,
    UPDATE_USER_ADDRESS_MTTN,
};
