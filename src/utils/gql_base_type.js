const {gql} = require("apollo-server-express");

const BASE_TYPE = gql`
    type Query {
        _dummy: String
    }
    type Mutation {
        _dummy: String
    }
`;

module.exports = BASE_TYPE;
