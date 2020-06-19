const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  application: {
    submittedDate: {
      type: Date,
      required: true,
    },
    approvedDate: {
      type: Date,
    },
    workplace: {
      type: String,
      required: true,
    },
    durationOfInternship: {
      type: String,
      required: true,
    },
    reference: {
      type: String,
    },
    stipend: {
      type: Number,
    },
    offerLetter: {},
  },
  approvedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "faculty",
    },
  ],
  docs: {
    ApplicationStatus: {
      type: String,
      default: "N",
    },
    UndertakingStatus: {
      type: String,
      default: "N",
    },
    OfferLetterStatus: {
      type: String,
      default: "N",
    },
    MarksheetsStatus: {
      type: String,
      default: "N",
    },
    AttendanceStatus: {
      type: String,
      default: "N",
    },
  },
  completionStatus: {
    type: String,
    default: "N",
  },
  holder: {
    type: String,
    default: "Class Coordinator",
  },
  comments: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Internship", internshipSchema);