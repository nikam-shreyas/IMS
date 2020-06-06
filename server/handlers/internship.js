const db = require("../models");

exports.addNewInternship = async (req, res, next) => {
  const { id } = req.decoded;
  const { docs, completionStatus, holder, application } = req.body;
  try {
    const student = await db.Student.findById(id);
    const internship = await db.Internship.create({
      docs,
      student,
      completionStatus,
      holder,
      application,
    });
    student.internships.push(internship._id);
    await student.save();

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
    res.status(200).json(internships);
  } catch (err) {
    err.status(400);
    next(err);
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

    const internship = await db.Internship.findById(id).populate("student", [
      "studentname",
      "id",
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
