const { User, Sequelize } = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const sendEmail = require("../utils/email");
const { formatDBError } = require("../formatDBError");

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK,
  });
}
const strInvalidCreds = "Invalid credentials.";

module.exports = {
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      if (!email) {
        return res.sendStatus(400);
      }
      //1. get user based on received email
      const user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (!user || !user.isEnabled) {
        //if no user matches the provided email, do not inform the client
        return res.sendStatus(200);
      }
      //2. generate a random reset token
      const resetToken = user.createResetPasswordToken();
      await user.save();

      //3. send the plain token to the user's email address
      const resetURL = `${req.get("origin")}/reset-password/${resetToken}`;
      const message = `
      <h1>Attendance Tracking System</h1>
      
      <p>We have received a password reset request for an account, associated with your email address. If this wasn't you, you can safely ignore this email. Otherwise, please use the link below:</p><hr>
      <p style="font-size:larger"><a href="${resetURL}">Change my password!</a></p><hr>
      <p>The link above will be valid for <b>10 minutes</b> from the time the request was issued.</p>
      </br>
      <p>Regards,<br><a href="https://github.com/IsmailSalehCode">Ismail Saleh</a></p>`;
      await sendEmail(user.email, "[ATS] Password Reset request", message);

      return res.sendStatus(200);
    } catch (err) {
      const { status, message } = formatDBError(err);
      return res.status(status).send(message);
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (!user) {
        return res.status(401).send(strInvalidCreds);
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).send(strInvalidCreds);
      }

      if (!user.isEnabled) {
        return res.status(403).send("Your profile is disabled!");
      }

      const userJson = user.toJSON();
      delete userJson.password;

      const token = jwtSignUser(userJson);
      // extract useful info from token for the UI
      const decodedToken = jwt.decode(token);

      return res.status(200).send({
        user: userJson,
        token: {
          content: token,
          issuedAt: decodedToken.iat,
          expiresAt: decodedToken.exp,
        },
      });
    } catch (err) {
      const { status, message } = formatDBError(err);
      return res.status(status).send(message);
    }
  },
};
