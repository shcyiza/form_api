const JWT = require('jsonwebtoken');
const makePayload = require('./payload');

const makeToken = (send_to, payload, ops = {force_prod: false}) => {
  const env = process.env
  return JWT.sign(
    makePayload(send_to, payload, ops),
    !!ops.force_prod ? env.PRODW_MAIL_SECRET : env.WAPI_MAIL_SECRET,
    {algorithm: 'RS256', noTimestamp: true}
  )
}

module.exports = makeToken
