const makeToken = require('./token.js');
const fetch = require('node-fetch');
const log = require('./logger.js');

const WapiMail = {
  transmit(code_name, send_to, payload, ops = undefined) {
    try {
      const token = makeToken(send_to, payload, ops);
      let status = "none";

      fetch(`https://wapi-mail.herokuapp.com/v1/transmit/${code_name}`, {
        method: 'post',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: ""
      })
      .then(res => {
        status = res.status;
        return res.json()
      })
      .then(json => {
        if(status === 200) {
          //console.log(json)
          log.success(json)
        } else {
          const err = new Error(json.message);
          err.error_cat = "API";
          throw err
        }
      })
      .catch(error => {
        log.error(error, status)
      })

    } catch(error) {
      log.error(error)
    }
  }
};

module.exports = WapiMail;
