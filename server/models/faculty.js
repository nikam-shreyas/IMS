const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const facultySchema = new mongoose.Schema({
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
  emailId: {
    type: String,
    unique: true,
  },
  department: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    enum: [
      "ClassCoordinator",
      "DepartmentInternshipCoordinator",
      "CollegeInternshipCoordinator",
      "HOD",
      "Principal",
      "Admin",
    ],
    default: "ClassCoordinator",
  },

  created: { type: Date, default: Date.now },
  applicationsReceived: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Internship",
    },
  ],
  applicationsApproved: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Internship",
    },
  ],
});

facultySchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const hashed = await bcrypt.hash(this.password, 10);
    this.password = hashed;
  } catch (err) {
    next(err);
  }
});
facultySchema.methods.comparePassword = async function (attempt, next) {
  try {
    return await bcrypt.compare(attempt, this.password);
  } catch (error) {
    next(err);
  }
};

module.exports = mongoose.model("Faculty", facultySchema);
