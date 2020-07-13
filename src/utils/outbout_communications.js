const send_sms = async function(to, body) {
    const twilio_client = require("twilio")(
        process.env.TWILIO_SID,
        process.env.TWILIO_TOKEN,
    );

    return twilio_client.messages.create({
        body,
        from: process.env.TWILIO_NUMBER,
        to,
    });
};

module.exports = {send_sms};
