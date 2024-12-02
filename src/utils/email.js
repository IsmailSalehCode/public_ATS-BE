const nodemailer = require("nodemailer");

async function sendEmail(recipient, subject, content) {
  if (!recipient || !subject || !content) {
    return new Error("Missing data for sendMail.");
  }
  /* Since .env files store all values as strings, you need to convert those string values into actual booleans when using them in your Node.js code*/
  const isMailerSecure = process.env.MAIL_IS_SECURE === "1";
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_SERVER,
    port: process.env.MAIL_PORT,
    secure: isMailerSecure,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_APP_PASSWORD,
    },
  });

  const emailOptions = {
    from: process.env.MAIL_USERNAME,
    to: recipient,
    subject: subject,
    html: content,
  };

  await transporter.sendMail(emailOptions);
}

module.exports = sendEmail;
