const nodemailer = require('nodemailer');
const Students = require('../models/student')

const {MAIL_FROM_ADDRESS, MAIL_FROM_NAME, MAIL_PASS} = process.env

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: MAIL_FROM_ADDRESS,
    pass: MAIL_PASS,
  },
});

exports.mailEveryone= async (subject, message) => {
  const students = await Students.findAll({
    attributes: ['email']
  })
  const toMail = students.map(student => student.email).join(', ')

  const info = await transporter.sendMail({
    from: `"${MAIL_FROM_NAME}" <${MAIL_FROM_ADDRESS}>`, // sender address
    to: toMail,
    subject,
    html: message
  });
  console.log("Message sent: %s", info.messageId);
}

exports.mailOne= async (toMail, subject, message) => {
  const info = await transporter.sendMail({
    from: `"${MAIL_FROM_NAME}" <${MAIL_FROM_ADDRESS}>`, // sender address
    to: toMail,
    subject,
    html: message
  });
  console.log("Message sent: %s", info.messageId);
}

