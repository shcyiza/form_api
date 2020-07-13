const {gql} = require("apollo-server-express");

const OFFER_TYPE = gql`
    type Offer {
        id: ID!
        name: String!
        nominal_price: Float!
        vat: Float!
        description: String
        company: Company
    }
`;

const OFFERS_QR = gql`
    extend type Query {
        Offers(company: String): [Offer]
    }
`;

module.exports = {OFFER_TYPE, OFFERS_QR};
