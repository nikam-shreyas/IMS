const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
  student: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    name: {
      firstname: {
        type: String,
        required: false,
      },
      lastname: {
        type: String,
        required: false,
      },
    },
    rollNo: {
      type: Number,
    },
    currentClass: {
      year: {
        type: String,
        required: false,
      },
      div: {
        type: Number,
        required: false,
      },
    },
    prevSemAttendance: {
      type: Number,
      required: false,
    },
    emailId: {
      type: String,
      required: true,
    },
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
      designation: String,
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
    designation: String,
  },
  comments: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Internship", internshipSchema);
