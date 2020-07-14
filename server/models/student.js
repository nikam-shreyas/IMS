const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const crypto = require("crypto");
const GridFsStorage = require("multer-gridfs-storage");
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
    unique: true,
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

const storage = new GridFsStorage({
  url: "mongodb://localhost/internship",
  file: (req, res) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

module.exports = mongoose.model("Student", studentSchema);
