const { regexPRT } = require("../config/rules");
const { User } = require("../models");
const crypto = require("crypto");
const msgInvalid = "Your password reset link is invalid!";
const msgExp =
  "Your password reset link has expired! Please request a new one.";
function isFormatValid(prt) {
  if (!regexPRT.test(prt)) {
    return false;
  }
  return true;
}

async function resetUsersPRTFields(user) {
  user.passwordResetToken = null;
  user.passwordResetTokenEXP = null;
  await user.save();
}

module.exports = async function (req, res, next) {
  const inputPRT = req.params.passwordResetToken;
  //1. is the token's format valid?
  if (isFormatValid(inputPRT) === false) {
    return res.status(400).send(msgInvalid);
  }
  //2. is there a user associated with the token?
  //2.1. we gotta encrypt it again tho, cuz that's how it is stored in the DB.
  const encryptedPRT = crypto
    .createHash("sha256")
    .update(inputPRT)
    .digest("hex");
  const user = await User.findOne({
    where: {
      passwordResetToken: encryptedPRT,
    },
  });
  if (!user || !user.passwordResetTokenEXP) {
    return res.status(400).send(msgInvalid);
  }
  //3. has the token expired?
  const currentDate = new Date();
  if (currentDate > user.passwordResetTokenEXP) {
    await resetUsersPRTFields(user);
    return res.status(400).send(msgExp);
  }

  //4. reset PRT fields
  await resetUsersPRTFields(user);

  //5. changePass method inside UserController expects the user to be hooked up to req.obj
  req.obj = user;
  return next();
};
