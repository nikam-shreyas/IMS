const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const studentSchema = new mongoose.Schema({
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
    // unique: true,
  },
  marksheets: [],
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  created: { type: Date, default: Date.now },
  internships: [{ type: mongoose.Schema.Types.ObjectId, ref: "Internship" }],
});

studentSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const hashed = await bcrypt.hash(this.password, 10);
    this.password = hashed;
    return next();
  } catch (err) {
    next(err);
  }
});

studentSchema.methods.comparePassword = async function (attempt, next) {
  try {
    return await bcrypt.compare(attempt, this.password);
  } catch (err) {
    next(err);
  }
};

module.exports = mongoose.model("Student", studentSchema);
