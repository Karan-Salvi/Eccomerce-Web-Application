import { createTransport } from 'nodemailer';

const sendEmail = async ({ email, subject, message }) => {
  const transporter = await createTransport({
    service: 'gmail',
    host: process.env.HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.SMPT_MAIL, // senders email
      pass: process.env.SMPT_PASSWORD, // app passoword created for your app by using step ::    google account> manage your google account >security>enable two step verification > search app password and create password for your app
    },
  });

  const mailOptions = {
    from: '',
    to: email,
    subject,
    text: message,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
