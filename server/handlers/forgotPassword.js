const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const transport = require("nodemailer-smtp-transport");
require("dotenv").config();

//mailing options and transportor
const options = {
  service: "gmail",
  auth: {
    user: process.env.EMAILFROM,
    pass: process.env.PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
};
const client = nodemailer.createTransport(transport(options));

module.exports = (app) => {
    const Student = db.Student.emailID;
    app.post('/forgotPassword', (req, res) => {
      if (req.body.email === '') {
        res.status(400).send('email required');
      }      
      Student.findOne({
        where: {
          emailID: req.body.emailID,
        },
      }).then((Student) => {
        if (Student === null) {          
          res.status(403).send('email not in db');
        } else {
          const token = crypto.randomBytes(20).toString('hex');
          user.update({
            resetPasswordToken: token,
            resetPasswordExpires: Date.now() + 3600000,
          });
  
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: `${process.env.EMAIL_ADDRESS}`,
              pass: `${process.env.EMAIL_PASSWORD}`,
            },
          });
  
          const mailOptions = {
            from: process.env.EMAILFROM,            
            to:Student.emailID,
            subject: 'Link To Reset Password',
            text:
              'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
              + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
              + `http://localhost:3031/reset/${token}\n\n`
              + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
          };
  
          
  
          transporter.sendMail(mailOptions, (err, response) => {
            if (err) {

            } else {              
              res.status(200).json('recovery email sent');
            }
          });
        }
      });
    });
  };