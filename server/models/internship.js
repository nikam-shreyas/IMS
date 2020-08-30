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
    internshipType: {
      type: String,
    },
    startDate: {
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
    NOCRequired: {
      type: String,
    },
  },
  files: [],
  approvedBy: [
    {
      designation: String,
      remark: String,
    },
  ],
  docs: {
    ApplicationStatus: {
      type: String,
      default: "Pending",
    },
    UndertakingStatus: {
      type: String,
      default: "Pending",
    },
    OfferLetterStatus: {
      type: String,
      default: "Pending",
    },
    MarksheetsStatus: {
      type: String,
      default: "Pending",
    },
    AttendanceStatus: {
      type: String,
      default: "Pending",
    },
  },
  completionStatus: {
    type: String,
    default: "Pending",
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
