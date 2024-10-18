const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = await nodemailer.createTransport({
    service: "gmail",
    host: process.env.HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.SMPT_MAIL, // senders email
      pass: process.env.SMPT_PASSWORD, // app passoword created for your app by using step ::    google account> manage your google account >security>enable two step verification > search app password and create password for your app
    },
  });

  const mailOptions = {
    from: "",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
