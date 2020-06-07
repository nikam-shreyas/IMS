const jwt = require("jsonwebtoken");

const db = require("../models");

exports.register = async (req, res, next) => {
  try {
    const student = await db.Student.create(req.body);
    const { id, username } = student;
    const token = jwt.sign({ id, username }, process.env.SECRET);
    res.status(201).json({ id, username, token });
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

exports.updateStudent = async (req, res, next) => {
  try {
    const { id } = req.decoded;
    const details = req.body;
    const student = await db.Student.findById(id);
    for (var key of Object.keys(details)) {
      student[key.toString()] = details[key];
    }
    console.log(student);
    student.save();

    res.status(200).json(student);
  } catch (err) {
    console.log(err);
    err.message = "Could not update";
    next(err);
  }
};
