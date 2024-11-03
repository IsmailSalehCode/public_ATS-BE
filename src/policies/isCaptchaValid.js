const axios = require("axios");

async function wow(req, res, next) {
  if (!req.headers.captcha) {
    return res.status(400).send("No captcha received!");
  }
  const secretKey = process.env.CAPTCHA_SECRET_KEY;
  const query = new URLSearchParams({
    secret: secretKey,
    response: req.headers.captcha,
    remoteip: req.connection.remoteAddress,
  }).toString();
  const verifyURL = `https://google.com/recaptcha/api/siteverify?${query}`;
  const response = await axios.post(verifyURL);
  const body = response.data;
  if (!body.success) {
    return res.status(400).send("Bad captcha received!");
  } else {
    next();
  }
}

module.exports = wow;
