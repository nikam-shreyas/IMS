const mongoose = require("mongoose");

const noticesSchema = new mongoose.Schema({
  subject: String,
  description: String,
  link: String,
  createdDate: Date,
  designation: String,
  duration: String,
  stipend: String,
  workplace: String,
  contact: String,
  emailId: String,
  location: String,
  positions: Number,
  domain: String,
  requirements: String,
});

module.exports = mongoose.model("Notices", noticesSchema);