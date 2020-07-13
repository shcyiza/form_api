const Mongoose = require("mongoose");
const logger = require("../utils/logger");
const mongo = {
    connect: function () {
        Mongoose.connect(process.env.DB_HOST, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });

        const db = Mongoose.connection;

        db.on("error", err => {
            logger.error("DB connection error!:", err);
        });
        db.once("open", () => {
            logger.info("DB successfully connected");
        });
        return db;
    }
};
module.exports = mongo;