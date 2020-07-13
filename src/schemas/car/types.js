const {gql} = require("apollo-server-express");

const CAR_TYPE = gql`
    type Car {
        id: ID!
        plate_number: String
        brand: String
        model: String
        color: String
    }
`;

const CAR_QR = gql`
    extend type Query {
        Car(plate_number: String!): Car
    }
`;
const USER_CARS_QR = gql`
    extend type Query {
        UserCars(user: String!): [Car]
    }
`;

const REGISTER_CAR_MTTN = gql`
    extend type Mutation {
        RegisterCar(
            plate_number: String!
            brand: String!
            model: String!
            color: String!
        ): Car
    }
`;

module.exports = {
    CAR_TYPE,
    CAR_QR,
    USER_CARS_QR,
    REGISTER_CAR_MTTN,
};
