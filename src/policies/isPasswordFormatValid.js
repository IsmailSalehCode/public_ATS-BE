const { regexPass } = require("../config/rules");
const msgInvalidPassFormat = "Invalid password format!";

module.exports = async function (req, res, next) {
  const inputPassword = req.body.password;
  if (!regexPass.test(inputPassword)) {
    return res.status(400).send(msgInvalidPassFormat);
  } else {
    next();
  }
};
