const db = require("../models");

exports.addNewNotice = async (req, res, next) => {
  const {
    subject,
    description,
    link,
    designation,
    duration,
    stipend,
    workplace,
    contact,
    location,
    positions,
    requirements,
    domain,
    emailId,
  } = req.body;
  try {
    const date = new Date();
    const notices = await db.Notices.create({
      subject,
      description,
      link,
      createdDate: date,
      designation,
      duration,
      stipend,
      workplace,
      contact,
      location,
      positions,
      requirements,
      domain,
      emailId,
    });

    return res.status(201).json(notices);
  } catch (err) {
    next({
      status: 400,
      message: err.message,
    });
  }
};

exports.showNotices = async (req, res, next) => {
  try {    
    const notices = await db.Notices.find();
    res.status(200).json(notices);
  } catch (err) {
    err.status(400);
    next(err);
  }
};

exports.studentsNotices = async (req, res, next) => {
  try {
    const { id } = req.decoded;   
    const studentInternships = await db.Student.findById(id).populate(
      "internships",
      "comments"
    );
  
    res.status(200).json(studentInternships["internships"]);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.deleteNotice = async (req, res, next) => {
  const { id: noticeId } = req.params;
  try {
    let notices = await db.Notices.findById(noticeId);
    if (!notices) throw new Error("No Notice found");
    await notices.remove();
    return res.status(202).json({ notices, deleted: true });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

