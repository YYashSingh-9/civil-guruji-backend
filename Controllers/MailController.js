const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secureConnection: false,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "derick.glover67@ethereal.email",
    pass: "xNsnXM3vfM7CcQ4gtp",
  },
  tls: {
    ciphers: "SSLv3",
  },
});

exports.mailWrapper = (sendTo, subject, message) => {
  const emailMessage = {
    from: "Civilguruji@gmail.om ", // sender address
    to: sendTo, // list of receivers
    subject: subject, // Subject line
    text: message, // plain text body
    html: "<b>Hello world?</b>", // html body
  };
  async function send_email_message() {
    // send mail with defined transport object
    const info = await transporter.sendMail(emailMessage);
    console.log("Message sent: %s", info.messageId);
  }
  send_email_message().catch((err) => console.log(err));
};
