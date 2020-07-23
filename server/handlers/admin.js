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

exports.register_faculty = async (req, res, next) => {
  try {
    const Fac = await db.Faculty.create(req.body);
    const { id, username } = Fac;
    const token = jwt.sign({ id, username }, process.env.SECRET);
    res.status(201).json({ id, username, token });
  } catch (err) {
    if (err.code === 11000) {
      err.message = "Sorry username is already taken.";
    }
    next(err);
  }
};

exports.login_faculty = async (req, res, next) => {
  try {
    const Fac = await db.Faculty.findOne({ username: req.body.username });
    const { id, username } = Fac;
    const valid = await Fac.comparePassword(req.body.password);
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

exports.login_admin = async (req, res, next) => {
  try {
    const Fac = await db.Faculty.findOne({ username: req.body.username });
    const { id, username, designation } = Fac;
    if (designation !== "Admin") {
      throw new Error();
    }
    const valid = await Fac.comparePassword(req.body.password);
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
exports.addFaculty = async (req, res, next) => {
  try {
    let password = req.body.password;
    const Fac = await db.Faculty.create(req.body);
    if (Fac) {
      let link =
        "<h4>Your have been added to IMS as a faculty member.</h4><br/>";
      link =
        link +
        "Your default username is : <b>" +
        Fac.username +
        "</b><br/>Your default password is : <b>" +
        password +
        "</b><br/><a href='http://localhost:3000/login'>Click here to login.</a>";
      let content =
        "BEGIN:VCALENDAR\r\nPRODID:-//ACME/DesktopCalendar//EN\r\nMETHOD:REQUEST\r\n...";
      var email = {
        from: process.env.EMAILFROM,
        to: Fac.emailId,
        subject: "Registered to IMS.",
        html: link,
        icalEvent: {
          filename: "invitation.ics",
          method: "request",
          content: content,
        },
      };
      client.sendMail(email, (err, info) => {
        if (err) {
          err.message = "Could not send email" + err;
        } else if (info) {
          let message = "Email sent successfully";
          return res.status(200).json({ Fac, message });
        }
      });
    } else {
      if (err.code === 11000) {
        err.message = "Something went wrong try again!";
      }
      next(err);
    }
  } catch (err) {
    if (err.code === 11000) {
      err.message = "Sorry username is already taken.";
    }
    next(err);
  }
};

exports.findFaculty = async (req, res, next) => {
  try {
    const { user } = req.params;
    const faculty = await db.Faculty.findOne({ username: user });
    if (!faculty) {
      throw new Error("Faculty not found");
    }
    return res.status(200).json(faculty);
  } catch (error) {
    next({
      status: 400,
      message: error.message,
    });
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const faculties = await db.Faculty.find().populate("faculties");
    res.status(200).json(faculties);
  } catch (err) {
    err.status(400);
    next(err);
  }
};

exports.deleteFaculty = async (req, res, next) => {
  try {
    const { user } = req.params;
    const faculty = await db.Faculty.findOne({ username: user });
    if (!faculty) throw new Error("Faculty not found");
    await faculty.remove();
    return res.status(200).json("Faculty deleted");
  } catch (error) {
    next({
      status: 400,
      message: error.message,
    });
  }
};

exports.showProfile = async (req, res, next) => {
  try {
    const { id } = req.decoded;
    const Profile = await db.Faculty.findOne({ _id: id, designation: "Admin" });
    if (Profile) {
      return res.status(200).json(Profile);
    } else {
      throw new Error("Not an admin.");
    }
  } catch (error) {
    next({
      status: 400,
      message: error.message,
    });
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const Profile = await db.Faculty.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          "name.firstname": req.body.firstname,
          "name.lastname": req.body.lastname,
          emailId: req.body.emailId,
          department: req.body.department,
          designation: req.body.designation,
        },
      },
      { new: true }
    );
    if (Profile) {
      return res.status(200).json(Profile);
    } else {
      throw new Error("Not an admin.");
    }
  } catch (error) {
    next({
      status: 400,
      message: error.message,
    });
  }
};

exports.resetPassword = async (req, res, next) => {
  const { oldpassword, newpassword } = req.body;
  const { id } = req.params;
  try {
    const Fac = await db.Faculty.findById({ _id: id });
    const valid = await Fac.comparePassword(oldpassword);
    if (valid) {
      const newhashed = await bcrypt.hash(newpassword, 10);
      const Profile = await db.Faculty.findOneAndUpdate(
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
        throw new Error("Admin not found!");
      }
    } else {
      throw new Error("Old password is wrong!");
    }
  } catch (err) {
    next(err);
  }
};

exports.findAllStudents = async (req, res, next) => {
  try {
    const students = await db.Student.find().populate();
    res.status(200).json(students);
  } catch (err) {
    err.status(400);
    next(err);
  }
};

exports.SomeStudents = async (req, res, next) => {
  try {
    const YEAR = req.query.YEAR;
    const DIV = req.query.DIV;
    const students = await db.Student.find({
      "currentClass.year": YEAR,
      "currentClass.div": DIV,
    });
    res.status(200).json(students);
  } catch (err) {
    err.status(400);
    next(err);
  }
};

exports.deletestudent = async (req, res, next) => {
  try {
    const arr = req.body;
    const student = await db.Student.deleteMany({
      _id: {
        $in: arr,
      },
    });

    if (!student) {
      throw new Error("Student not found");
    } else {
      return res.status(200).json("Student deleted");
    }
  } catch (error) {
    next({
      status: 400,
      message: error.message,
    });
  }
};
