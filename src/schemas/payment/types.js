const {gql} = require("apollo-server-express");

const PAYMENT_INFO_TYPE = gql`
    type PaymentInfo {
        internal_token: String
        order_id: String
        payment_ref: String
        payment_client_secret: String
    }
`;

const TOKENIZE_CHARGE_INFO_MTTN = gql`
    extend type Query {
        TokenizeChargeInfo(order_id: String!): PaymentInfo!
    }
`;

const UPDATE_ORDER_PAYMENT_INFO_MTTN = gql`
    extend type Mutation {
        UpdateOrderPaymentInfo(
            order_id: String!
            payment_ref: String!
            payment_client_secret: String!
        ): Order!
    }
`;

const GET_CHARGE_INFO_QR = gql`
    extend type Query {
        GetChargeInfo(
            payment_ref: String!
            payment_client_secret: String!
        ): PaymentInfo!
    }
`;

const CHARGE_PAYMENT_MTTN = gql`
    extend type Mutation {
        ChargePayment(token: String!, order_id: String!): Order!
    }
`;

module.exports = {
    PAYMENT_INFO_TYPE,
    TOKENIZE_CHARGE_INFO_MTTN,
    UPDATE_ORDER_PAYMENT_INFO_MTTN,
    GET_CHARGE_INFO_QR,
    CHARGE_PAYMENT_MTTN,
};
