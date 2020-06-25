const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
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

exports.register = async (req, res, next) => {
  try {
    const student = await db.Student.create(req.body);
    if(student){
      let link = "<h2>Welcome!!</h2><br/><h4>Your have been added to IMS as a student.</h4><br/>";
    // link =
    //   link +
    //   "Your default username is : <b>" +
    //   student.username +
    //   "</b><br/>Your default password is : <b>" +
    //   student.password +
    //   "</b><br/><a href='http://localhost:3000/login'>Click here to login.</a>";
    var email = {
      from: process.env.EMAILFROM,
      to: student.emailId,
      subject: "IMS notification",
      // text:'You have been added to IMS',
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
    }else{
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
//console
exports.login = async (req, res, next) => {
  try {
    const student = await db.Student.findOne({ username: req.body.username});
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

exports.updateStudent = async (req, res, next) => {
  try {
    const { id } = req.decoded;
    const details = req.body;
    const student = await db.Student.findById(id);

    for (var key of Object.keys(details)) {
      student[key.toString()] = details[key];
    }
    student.save();
    //console.log(student);
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

    // const { name, currentClass, rollNo, prevSemAttendance, emailId,_id } = student;
    res
      .status(200)
      // .json({ name, currentClass, rollNo, prevSemAttendance, emailId,_id });
      .json(student);
  } catch (err) {
    next({
      status: 400,
      message: err.message,
    });
  }
};


exports.resetStudentPassword = async (req, res, next) => {
  console.log('here')
  const { oldpassword, newpassword } = req.body;
  const { id } = req.decoded;
  console.log(id)
  try {
    const Stud = await db.Student.findById({  _id:id });
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
    // err.message = "Invalid username/password";
    next(err);
  }
};