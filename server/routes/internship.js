const router = require("express").Router();
const handle = require("../handlers");
const auth = require("../middlewares/auth");
const multer = require("multer");

//define storage that stores the uploaded documents in public/Documents, keep the original filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/Documents");
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

//define filter that out other files and accept only pdfs, throws error if not pdf
const FileFilter = (req, file, cb) => {
  if (!file.originalname.match(".(pdf|PDF)$")) {
    return cb(new Error("You can upload only pdf files!"), false);
  }
  cb(null, true);
};

//pass the defined options to multer object
const upload = multer({
  storage: storage,
  limits: { fieldSize: 5 * 1024 * 1024 },
  fileFilter: FileFilter,
});

router
  .route("/")
  .get(auth, handle.showInternships)
  .post(auth, handle.addNewInternship);
router.route("/approved").get(auth, handle.showApprovedInternships);

router.get("/student", auth, handle.studentsInternships);
router.route("/forward").post(auth, handle.forwardInternship);
router.route("/update").post(auth, handle.updateInternship);
router.route("/approve").post(auth, handle.approveInternship);
router.route("/reject").post(auth, handle.rejectInternship);

//accepts 6 or less files in an array from client side
router
  .route("/uploadDocument")
  .post(auth, upload.array("docs", 6), (req, res) => {
    if (res.statusCode === 200) {
      return res.status(200).json({ message: "Upload Done" });
    } else {
      return res.json({ message: "Error" });
    }
  });
router.route("/allStats").get(auth, handle.getStats);
router.route("/all").get(auth, handle.showAllInternships);
router.route("/report").get(auth, handle.showReport);
router.route("/getFile").post(handle.getFile);

router.route("/aictereport").get(handle.getaictereport);

router.route("/:id").get(handle.getInternship);
// .delete(auth, handle.deleteInternship);
router.route("/delete").post(handle.deleteInternship);
module.exports = router;
