const Redis = require("ioredis");
const logger = require("../utils/logger");
const redis = {
    connect: function() {
        const redisConnection = new Redis();

        redisConnection.on("error", err => {
            logger.error("redis connection error:", err);
        });

        redisConnection.on("ready", () => {
            logger.info("redis successfully connected");
        });

        return redisConnection;
    },
};

module.exports = redis;
