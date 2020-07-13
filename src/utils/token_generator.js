function generateDigitToken(length) {
    let result = "",
        characters = "0123456789",
        charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength),
        );
    }
    return result;
}

module.exports = {generateDigitToken};
