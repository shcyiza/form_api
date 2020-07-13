require('dotenv').config()

const assert = require('assert');
const fs = require('fs')
const JWT = require('jsonwebtoken');

const makePayload = require('./payload.js');
const makeToken = require('./token');

describe('WAPI MAIL nodeJS SDK', function() {
    const vars = {
        greeting: "Hi",
        saas: "Wapi_wapi",
        name: "popo",
        blinck: "skuuuurrrr"
    };

    const send_to = "test@wapi-mail.com";

    const valid_payload = makePayload(send_to, vars);

    it('environment variable should be setten up', () => {
        assert.strictEqual(process.env.WAPI_MAIL_CLIENT_ID, "Lorl6h8");
    });

    describe('payload', () => {
        it('payload.transaction.vars should return an object given by second argument', () => {
            assert.deepStrictEqual(valid_payload.transaction.vars, vars);
        });

        it('exp attribut should be less to the timestamp in a minute from now', () => {
            assert.strictEqual(valid_payload.exp, (Math.floor(Date.now() / 1000) + 59));
        });

        describe('recipient email', () => {
            it('makePayload fn should reject the request if first argument is not an email', () => {
                const unvalid_payload = () => makePayload('lol.com', vars)
                assert.throws(unvalid_payload, Error);
            });

            it('payload.transaction["send_to"] should return an email given in by first argument when email is valid', () => {
                assert.strictEqual(valid_payload.transaction.send_to, send_to);
            });
        });
    });

    describe('jwt', () => {
        const token = makeToken(send_to, vars)
        
        it('the token produce by the makeToken Fn should be valid and issue a valid payload', () => {
            let verified_payload;
            const cert = fs.readFileSync('public.pem');

            JWT.verify(token, cert, (err, decoded) => {
                verified_payload = decoded || err
            });

            assert.deepStrictEqual(verified_payload, valid_payload);
        });      
    });
});
