const makePayload = (send_to, payload, ops = {}) => {
  const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  if (email_regex.test(String(send_to).toLowerCase())) {
    const env = process.env;
    return {
      client_id: !!ops.force_prod ? env.PRODW_MAIL_CLIENT_ID : env.WAPI_MAIL_CLIENT_ID,
      exp: (Math.floor(Date.now() / 1000) + 59),
      transaction: {
        send_to: send_to,
        vars: {...payload}
      }
    }
  } else {
    err = new Error(`unvalide email address ${send_to} was given`);
    err.error_cat = "input";
    const err_at = err.stack.match(/\(+\/[^\s]+[\w]\)/g, err.stack);
    err.error_at = err_at[err_at.length - 1];
    throw err
  }
};

module.exports = makePayload;
