const mongoose = require("mongoose");

mongoose.set("debug", true);

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/internship", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify:false,
});

module.exports.Student = require("./student");

module.exports.Internship = require("./internship");

module.exports.Notices = require("./notices");

module.exports.Faculty = require("./faculty");