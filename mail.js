require("dotenv").config();
const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
});

const referrerSendMail = async (name,address,refree,course) => {

const mailOptions = {
  from: {
    name: "Courdemy",
    adderess: process.env.USER,
  },
  to: address,
  subject: `Thank You for Referring ${course} Course to ${refree}`,
  text: `
Dear ${name},

I hope this email finds you well.

I wanted to personally thank you for referring ${refree} to our ${course} Course. We are thrilled to welcome ${refree} to our learning community and appreciate your support in helping us reach more eager learners.

Your recommendation means a lot to us, and we are committed to ensuring that ${refree} has a valuable and enriching experience with us. If there's anything more we can do for you or if you have any additional referrals, please don't hesitate to let us know.

Thank you once again for your trust and support.

Best regards,

Sheikh Altamash,
Courdemy
  `,
};
const sendMail = async (transporter, mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    console.log("mail has been send successfully to referrer ");
  } catch (e) {
    console.log(e.message);
  }
};
sendMail(transporter, mailOptions);
}
const refreeSendMail =async (name,address,referrer,course) => {
    
const mailOptions = {
  from: {
    name: "Courdemy",
    adderess: process.env.USER,
  },
  to: address,
  subject: `Welcome to ${course} Course  at Courdemy`,
  text: `Dear ${name},

I am delighted to welcome you to our ${course} Course at Courdemy , and I wanted to extend my sincere thanks to ${referrer} for recommending us to you. We are thrilled to have you join our learning community and are committed to providing you with an exceptional learning experience.

If you have any questions or need assistance as you start the course, please don't hesitate to reach out. We are here to support you every step of the way.

Once again, welcome aboard, and thank you for choosing Courdemy. We look forward to your journey with us!

Best regards,

Sheikh Altamash
Courdemy
`,
};
const sendMail = async (transporter, mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    console.log("mail has been send successfully refree");
  } catch (e) {
    console.log(e.message);
  }
};
sendMail(transporter, mailOptions);
}
module.exports = { referrerSendMail, refreeSendMail };