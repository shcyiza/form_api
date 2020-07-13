const {CarModel} = require("../../models/index");
const logger = require("../../utils/logger");

const Car = {};

const CarQr = {
    Car(parent, {plate_number}) {
        return CarModel.findOne({plate_number}).exec();
    },
};

const UserCarsQr = {
    async UserCars(parent, {user}) {
        const user_cars = await CarModel.find({user}).exec();

        return user_cars || [];
    },
};

const RegisterCarMttn = {
    RegisterCar(parent, args, {req}) {
        const car = new CarModel({...args, user: req.user.user_id});

        return car
            .save()
            .then(resp => {
                logger.info(
                    `model Car successful: ${args.plate_number} Registered successfully`,
                );
                return resp;
            })
            .catch(err => {
                logger.error(`model Car error: ${err.message}`);
                throw err;
            });
    },
};

module.exports = {Car, CarQr, UserCarsQr, RegisterCarMttn};
