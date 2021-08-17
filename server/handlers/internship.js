const db = require("../models");
const chain = require("./chain");
let nodemailer = require("nodemailer");
let transport = require("nodemailer-smtp-transport");
require("dotenv").config();
const path = require("path");
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
  const { application, files } = req.body;
  var path;
  console.log(files);

  try {
    const student = await db.Student.findById(id);
    const internship = await db.Internship.create({
      student: {
        id: id,
        name: {
          firstname: student.name.firstname,
          lastname: student.name.lastname,
        },
        currentClass: {
          year: student.currentClass.year,
          div: student.currentClass.div,
        },
        prevSemAttendance: student.prevSemAttendance,
        rollNo: student.rollNo,
        emailId: student.emailId,
      },
      application,
      files,
    });

    const faculty = await db.Faculty.findOne({
      currentClass: {
        year: student.currentClass.year,
        div: student.currentClass.div,
      },
    });
    internship.holder = { id: faculty._id, designation: faculty.designation };

    faculty.applicationsReceived.push(internship._id);
    student.internships.push(internship._id);
    await student.save();
    await faculty.save();
    await internship.save();
    var email = {
      from: process.env.EMAILFROM,
      to: student.emailId,
      subject: "New Internship Application Created",
      html:
        "Dear student,<br/>" +
        "New Internship Application for <b>" +
        application.durationOfInternship +
        " months</b> at <b>" +
        application.workplace +
        "</b> has been created on <b>" +
        new Date().toDateString() +
        "</b>. <br /><br /> Your application is currently held by: Prof. <b>" +
        faculty.name.firstname +
        " " +
        faculty.name.lastname +
        "</b>. <br /><br /> <a href='https://localhost:3000'>Click here to login and check.</a> <br /><br />" +
        "This is an automatically generated mail. Please do not respond to this mail.<br/><br/>" +
        "Regards<br/>IMS Portal<br/>Pune Institute of Computer Technology",
    };

    var emailFac = {
      from: process.env.EMAILFROM,
      to: faculty.emailId,
      subject: "New Internship Application for Approval",
      html:
        "Respected Coordinator,<br/>" +
        "New Internship application for <b>" +
        application.durationOfInternship +
        " months</b> at <b>" +
        application.workplace +
        "</b>has been created on <b>" +
        new Date().toDateString() +
        "</b>. <br /><br />Application received from <b>" +
        student.name.firstname +
        " " +
        student.name.lastname +
        "</b> studying in <b>" +
        student.currentClass.year +
        " " +
        student.currentClass.div +
        "  </b>" +
        "</b>. <br /><br /> <a href='https://localhost:3000'>Click here to login and check.</a> <br /><br />" +
        "This is an automatically generated mail. Please do not respond to this mail.<br/><br/>" +
        "Regards<br/>IMS Portal<br/>Pune Institute of Computer Technology",
    };

    client.sendMail(email, (err, info) => {
      if (err) {
      } else if (info) {
      }
    });

    client.sendMail(emailFac, (err, info) => {
      if (err) {
      } else if (info) {
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
    const { id } = req.decoded;
    let faculty = await db.Faculty.findById(id).populate({
      path: "applicationsReceived",
      model: "Internship",
    });
    res.status(200).json(faculty.applicationsReceived);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};
exports.showAllInternships = async (req, res, next) => {
  try {
    const { id } = req.decoded;
    let internships = await db.Internship.find();
    res.status(200).json(internships);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};
exports.showApprovedInternships = async (req, res, next) => {
  try {
    const { id } = req.decoded;
    let faculty = await db.Faculty.findById(id).populate({
      path: "applicationsApproved",
      model: "Internship",
    });
    res.status(200).json(faculty.applicationsApproved);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.showReport = async (req, res, next) => {
  try {
    const { id } = req.decoded;
    console.log(id);
    let approved = await db.Faculty.findById(id).populate({
      path: "applicationsApproved",
      model: "Internship",
    });
    let received = await db.Faculty.findById(id).populate({
      path: "applicationsReceived",
      model: "Internship",
    });
    console.log(approved.applicationsApproved);
    console.log(received.applicationsReceived);
    let applications = [];
    applications = received.applicationsReceived;
    approved.applicationsApproved.forEach((element) => {
      applications.push(element);
    });
    console.log(applications);
    res.status(200).json(applications);
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

exports.getInternship = async (req, res, next) => {
  try {
    const { id } = req.params;
    const internship = await db.Internship.findById(id);
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
  // console.log("hello");
  const { id: internshipId } = req.params;
  const { id: studentId } = req.decoded;
  try {
    let student = await db.Student.findById(studentId);
    if (student.internships) {
      student.internships = student.internships.filter((studentInternship) => {
        return studentInternship._id.toString() !== internshipId.toString();
      });
    }

    const internship = await db.Internship.findById(internshipId);
    if (!internship) {
      throw new Error("No internship found");
    }
    if (internship.student.id.toString() !== studentId) {
      throw new Error("Unauthorized access");
    }
    await student.save();
    await internship.remove();
    return res.status(200).json({ internship, deleted: true });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.updateInternship = async (req, res, next) => {
  try {
    const { _id: id } = req.body;
    const details = req.body;
    let internship = await db.Internship.findById(id);
    for (var key of Object.keys(details)) {
      internship[key.toString()] = details[key];
    }
    internship.comments = "\nApplication status changed! Please check.";
    await internship.save();
    res.status(200).json(internship);
  } catch (err) {
    err.message = "Could not update";
    next(err);
  }
};

exports.approveInternship = async (req, res, next) => {
  const { _id: internshipId, remark } = req.body;
  const { id: facultyId } = req.decoded;
  try {
    let internship = await db.Internship.findById(internshipId);
    let emailId = internship.student.emailId;
    internship["completionStatus"] = "Approved";

    let faculty = await db.Faculty.findById(facultyId);
    faculty["applicationsApproved"].push(internshipId);
    faculty["applicationsReceived"].splice(
      faculty["applicationsReceived"].indexOf(internshipId),
      1
    );
    internship.approvedBy.push({
      designation: faculty.designation,
      remark: remark,
    });
    await faculty.save();
    internship.comments =
      "Congratulations! Your application" +
      internshipId +
      " has been approved.";
    await internship.save();
    var email = {
      from: process.env.EMAILFROM,
      to: emailId,
      subject: "Internship Application Approved!",
      html:
        "Dear Student,<br /> " +
        "Your internship application for <b>" +
        internship.application.workplace +
        "</b> has been <b>approved</b>.<br /> <br /> <strong><a href=''>Click Here</a></strong> to login and check.<br /> <br />" +
        "This is an automatically generated mail. Please do not respond to this mail.<br/><br/>" +
        "Regards<br/>IMS Portal<br/>Pune Institute of Computer Technology",
    };
    client.sendMail(email, (err, info) => {
      if (err) {
      } else if (info) {
      }
    });
    res.status(200).json(internship);
  } catch (err) {
    err.message = "Could not approve";
    next(err);
  }
};

exports.forwardInternship = async (req, res, next) => {
  const { _id: internshipId, remark } = req.body;
  const { id: facultyId } = req.decoded;
  try {
    let internship = await db.Internship.findById(internshipId);
    let faculty = await db.Faculty.findById(facultyId);

    faculty["applicationsApproved"].push(internshipId);
    faculty["applicationsReceived"].splice(
      faculty["applicationsReceived"].indexOf(internshipId),
      1
    );
    internship.approvedBy.push({
      designation: faculty.designation,
      remark: remark,
    });
    let forwardToFaculty = await db.Faculty.findOne(
      chain.getNextPerson(faculty.designation, faculty.department)
    );
    if (!forwardToFaculty) {
      throw new Error("Next point of contact unavailable.");
    }

    internship.holder = {
      designation: forwardToFaculty.designation,
    };
    internship.comments =
      "\nApplication id: " +
      internship._id +
      " has been approved by " +
      faculty.designation +
      ". It is now reviewed by: " +
      forwardToFaculty.designation +
      ".";
    forwardToFaculty.applicationsReceived.push(internshipId);
    await faculty.save();
    await forwardToFaculty.save();
    await internship.save();
    const emailId = internship.student.emailId;
    var email = {
      from: process.env.EMAILFROM,
      to: emailId,
      subject: "Internship Application Status Changed!",
      html:
        "Dear Student,<br /> " +
        "Your internship application for <b>" +
        internship.application.workplace +
        "</b> has been approved by <b>" +
        faculty.designation +
        "</b>. It is currently being reviewed by: <b>" +
        forwardToFaculty.designation +
        " (" +
        forwardToFaculty.name.firstname +
        " " +
        forwardToFaculty.name.lastname +
        ")" +
        "</b><br /> <br /> <strong><a href=''>Click Here</a></strong> to login and check.<br /> <br />" +
        "This is an automatically generated mail. Please do not respond to this mail.<br/><br/>" +
        "Regards<br/>IMS Portal<br/>Pune Institute of Computer Technology",
    };
    var emailFac = {
      from: process.env.EMAILFROM,
      to: emailId,
      subject: "New Internship Application for Approval!",
      html:
        "Respected Coordinator,<br/>" +
        "You have a new internship application for approval. Application is approved and forwarded by <b>" +
        faculty.name.firstname +
        " " +
        faculty.name.lastname +
        " " +
        "</b><br /> <br /> <strong><a href=''>Click Here</a></strong> to login and check.<br /> <br />" +
        "This is an automatically generated mail. Please do not respond to this mail.<br/><br/>" +
        "Regards<br/>IMS Portal<br/>Pune Institute of Computer Technology",
    };
    client.sendMail(email, (err, info) => {
      if (err) {
      } else if (info) {
      }
    });
    client.sendMail(emailFac, (err, info) => {
      if (err) {
      } else if (info) {
      }
    });
    res.status(200).json(internship);
  } catch (err) {
    err.message = "Could not forward";
    next(err);
  }
};

exports.rejectInternship = async (req, res, next) => {
  try {
    const { _id: internshipId, comments } = req.body;
    const { id: facultyId } = req.decoded;
    const internship = await db.Internship.findById(internshipId);
    const faculty = await db.Faculty.findById(facultyId);
    faculty.applicationsReceived.splice(
      faculty.applicationsReceived.indexOf(internshipId),
      1
    );

    faculty.applicationsApproved.push(internshipId);
    internship.comments =
      "Your application " +
      internshipId +
      " has been rejected by " +
      faculty.designation +
      ". Reason: " +
      comments +
      "";
    internship.completionStatus = "Rejected";
    await internship.save();
    await faculty.save();
    var email = {
      from: process.env.EMAILFROM,
      to: internship.student.emailId,
      subject: "Internship Application Rejected!",
      html:
        "Dear Student,<br /> " +
        "Your internship application for <b>" +
        internship.application.workplace +
        "</b> has been rejected by the <b>" +
        faculty.designation +
        " (" +
        faculty.name.firstname +
        " " +
        faculty.name.lastname +
        ")" +
        "<br />Reason: </b>" +
        comments +
        "<br /> <br /> <strong><a href=''>Click Here</a></strong> to login and check.<br /> <br />" +
        "This is an automatically generated mail. Please do not respond to this mail.<br/><br/>" +
        "Regards<br/>IMS Portal<br/>Pune Institute of Computer Technology",
    };
    client.sendMail(email, (err, info) => {
      if (err) {
      } else if (info) {
      }
    });

    res.status(200).json(internship);
  } catch (err) {
    err.message = "Could not reject";
    next(err);
  }
};

exports.getStats = async (req, res, next) => {
  try {
    //top 5 workplaces-info
    const top5workplaces = await db.Internship.aggregate([
      { $group: { _id: "$application.workplace", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);
    //datewise status-bar
    const datewiseStatusDistribution = await db.Internship.aggregate([
      {
        $group: {
          _id: {
            sdate: {
              $dateToString: {
                format: "%Y-%m",
                date: "$application.submittedDate",
                onNull: "2020-05",
              },
            },
            status: "$completionStatus",
          },
          count: { $sum: 1 },
        },
      },
      { $limit: 48 },
    ]);
    //yearwise-polar
    const yearwiseDistribution = await db.Internship.aggregate([
      { $group: { _id: "$student.currentClass.year", count: { $sum: 1 } } },
    ]);
    //class wise in each year-doughnut
    const classwiseDistribution = await db.Internship.aggregate([
      {
        $group: {
          _id: {
            year: "$student.currentClass.year",
            div: "$student.currentClass.div",
          },
          count: { $sum: 1 },
        },
      },
    ]);
    //monthwise-line
    const totalMonthwise = await db.Internship.aggregate([
      {
        $group: {
          _id: {
            sdate: {
              $dateToString: {
                format: "%Y-%m",
                date: "$application.startDate",
                onNull: "2020-05",
              },
            },
          },
          count: { $sum: 1 },
        },
      },
      { $limit: 48 },
    ]);
    let data = {};
    data["top5workplaces"] = top5workplaces;
    data["datewiseStatusDistribution"] = datewiseStatusDistribution;
    data["yearwiseDistribution"] = yearwiseDistribution;
    data["classwiseDistribution"] = classwiseDistribution;
    data["totalMonthwise"] = totalMonthwise;

    res.status(200).json(data);
  } catch (err) {
    next({
      status: 400,
      message: err.message,
    });
  }
};

exports.getFile = async (req, res, next) => {
  const { file } = req.body;
  console.log(file);
  let p = path.join(__dirname, "../public/Documents/" + file);
  res.sendFile(p, (err) => {
    if (err) console.log(err.message);
  });
};

exports.getaictereport = async (req, res, next) => {
  try {
    const today = new Date();

    const previousYear = await db.Internship.aggregate([
      {
        $match: {
          "application.submittedDate": {
            $gte: new Date(today.getFullYear() - 1, 6, 1),
            $lt: new Date(today.getFullYear(), 6, 30),
          },
        },
      },
      {
        $group: {
          _id: { department: "$student.currentClass.year" },
          total: { $sum: 1 },
        },
      },
    ]);
    console.log(previousYear);
    const lastTYear = await db.Internship.aggregate([
      {
        $match: {
          "application.submittedDate": {
            $gte: new Date(today.getFullYear() - 2, 6, 1),
            $lt: new Date(today.getFullYear() - 1, 6, 30),
          },
        },
      },
      {
        $group: {
          _id: { department: "$student.currentClass.year" },
          total: { $sum: 1 },
        },
      },
    ]);
    console.log(lastTYear);
    let data = {};
    data["previousYear"] = previousYear;
    data["lastTYear"] = lastTYear;
    console.log(data);
    if (!data) {
      throw new Error("Empty");
    } else {
      return res.status(200).json(data);
    }
  } catch (error) {
    next({
      status: 400,
      message: error.message,
    });
  }
};
