const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
const nodemailer = require("nodemailer");
const transport = require("nodemailer-smtp-transport");
require("dotenv").config();

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

exports.register = async (req, res, next) => {
  try {
    const student = await db.Student.create(req.body);
    if (student) {
      let link =
        "<h2>Welcome to IMS!</h2><br/><h4>Your registration to IMS as a student was successful.</h4><br/>";

      var email = {
        from: process.env.EMAILFROM,
        to: student.emailId,
        subject: "Registration Successful",
        html: link,
      };
      client.sendMail(email, (err, info) => {
        if (err) {
          err.message = "Could not send email" + err;
        } else if (info) {
          const { id, username } = student;
          const token = jwt.sign({ id, username }, process.env.SECRET);
          res.status(201).json({ id, username, token });
        }
      });
    } else {
      err.message = "Something went wrong try again!";
      next(err);
    }
  } catch (err) {
    if (err.code === 11000) {
      err.message = "Sorry username is already taken.";
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const student = await db.Student.findOne({ username: req.body.username });
    const { id, username } = student;
    const valid = await student.comparePassword(req.body.password);
    if (valid) {
      const token = jwt.sign({ id, username }, process.env.SECRET);
      res.json({ id, username, token });
    } else {
      throw new Error();
    }
  } catch (err) {
    err.message = "Invalid username/password";
    next(err);
  }
};

exports.genPassword = () => {
  var length = 10,
    charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@_",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { username, emailId, role } = req.body;
    var user;
    if (role === "student") {
      user = await db.Student.findOne({
        username: username,
        emailId: emailId,
      });
    } else {
      user = await db.Faculty.findOne({
        username: username,
        emailId: emailId,
      });
    }
    if (!user) {
      let err = new Error();
      err.message =
        "Sorry, the credentials do not match with the one in the database.";
      next(err);
    } else {
      let tempPwd = this.genPassword();
      user.password = tempPwd;
      user.save();
      var email = {
        from: process.env.EMAILFROM,
        to: emailId,
        subject: "Password Changed.",
        html:
          "Your request for password reset has been approved." +
          "<br />You can login to IMS using this temporary password: <br /><b>" +
          tempPwd +
          "</b>",
      };
      client.sendMail(email, (err, info) => {
        if (err) {
          err.message = "Could not send email" + err;
        } else if (info) {
          let message = "Email sent successfully";
          return res.status(200).json({ message });
        }
      });
    }
  } catch (err) {
    err.message = "Could not reset password. Please try again.";
    next(err);
  }
};

exports.updateStudent = async (req, res, next) => {
  try {
    const { id } = req.decoded;
    const details = req.body;
    const student = await db.Student.findById(id);

    for (var key of Object.keys(details)) {
      student[key.toString()] = details[key];
    }
    student.save();
    const { name, currentClass, rollNo, prevSemAttendance, emailId } = student;
    res
      .status(200)
      .json({ name, currentClass, rollNo, prevSemAttendance, emailId });
  } catch (err) {
    err.message = "Could not update";
    next(err);
  }
};

exports.getStudentDetails = async (req, res, next) => {
  try {
    const { id } = req.decoded;

    const student = await db.Student.findById(id);
    if (!student) {
      throw new Error("No student found");
    }
    res.status(200).json(student);
  } catch (err) {
    next({
      status: 400,
      message: err.message,
    });
  }
};

exports.resetStudentPassword = async (req, res, next) => {
  const { oldpassword, newpassword } = req.body;
  const { id } = req.decoded;
  try {
    const Stud = await db.Student.findById({ _id: id });
    const valid = await Stud.comparePassword(oldpassword);
    if (valid) {
      const newhashed = await bcrypt.hash(newpassword, 10);
      const Profile = await db.Student.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            password: newhashed,
          },
        },
        { new: true }
      );
      if (Profile) {
        return res.status(200).json(Profile);
      } else {
        throw new Error("Student not found!");
      }
    } else {
      throw new Error("Old password is wrong!");
    }
  } catch (err) {
    next(err);
  }
};
