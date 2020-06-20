const db = require("../models");
let nodemailer = require("nodemailer");
let transport = require("nodemailer-smtp-transport");
require("dotenv").config();

//mailing options and transportor
var options = {
  service: "gmail",
  auth: {
    user: process.env.EMAILFROM,
    pass: process.env.PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
};
let client = nodemailer.createTransport(transport(options));

exports.addNewInternship = async (req, res, next) => {
  const { id } = req.decoded;
  const { application } = req.body;
  try {
    const student = await db.Student.findById(id);
    const internship = await db.Internship.create({
      student,
      application,
    });
    student.internships.push(internship._id);
    await student.save();    

    let link="<h4>You have a new internship application.</h4><br/>"
    link=link+"<a href='http://localhost:3000/login'>Click here to login and check.</a>";
    var email = {
      from: process.env.EMAILFROM,
      to:student.emailId,
      subject: "New Application",
      // text: 'You have a new internship application',
      html: "<a href='http://localhost:3000/login'>Click here to login.</a>",
    };
    console.log(email);
    client.sendMail(email, (err, info) => {
        if(err){
          console.log(err)
        }
        else if(info){
          console.log(info)
        }
    });
    
    return res.status(201).json({ ...internship._doc, student: student._id });
  } catch (err) {
    next({
      status: 400,
      message: err.message,
    });
  }
};

exports.showInternships = async (req, res, next) => {
  try {
    //const internships = await db.internships.find().populate('student',['studentname','id']);
    const internships = await db.Internship.find().populate("internships");
    console.log("im");
    res.status(200).json(internships);
  } catch (err) {
    err.status(400);
    next(err);
  }
};



exports.getInternship = async (req, res, next) => {
  try {
    const { id } = req.params;

    const internship = await db.Internship.findById(id).populate("student", [
      "name",
      "currentClass",
      "prevSemAttendance",
      "marksheets",
      "rollNo",
    ]);
    if (!internship) {
      throw new Error("No internship found");
    }

    res.status(200).json(internship);
  } catch (err) {
    next({
      status: 400,
      message: err.message,
    });
  }
};

exports.deleteInternship = async (req, res, next) => {
  const { id: internshipId } = req.params;
  const { id: studentId } = req.decoded;
  try {
    let student = await db.Student.findById(studentId);
    if (student.internships) {
      // not sure if necessary either...
      student.internships = student.internships.filter((studentInternship) => {
        return studentInternship._id.toString() !== internshipId.toString(); // not sure if necessary to use toString()
      });
    }

    const internship = await db.Internship.findById(internshipId);
    if (!internship) throw new Error("No internship found");
    if (internship.student.toString() !== studentId) {
      throw new Error("Unauthorized access");
    }
    await student.save();
    await internship.remove();
    return res.status(202).json({ internship, deleted: true });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};


exports.getInternshipsFaculty = async (req, res, next) => {
  try {
    //const { id } = req.decoded;
    console.log("Im here in fac get intern");
    const internship = await db.Student.populate("internships");
    //console.log("im here "+internship.internships.docs.ApplicationStatus);
    res.status(200).json(internship.internships);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};



exports.studentsInternships = async (req, res, next) => {
  try {
    const { id } = req.decoded;
    const student = await db.Student.findById(id).populate("internships");
    res.status(200).json(student.internships);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};