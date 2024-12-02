const { regexEmail } = require("../config/rules");
const msgFailed = "Invalid email format!";

module.exports = async function (req, res, next) {
  const inputEmail = req.body.email;
  if (!regexEmail.test(inputEmail)) {
    return res.status(400).send(msgFailed);
  } else {
    next();
  }
};
