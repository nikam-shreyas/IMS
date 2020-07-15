const router = require("express").Router();
const handle = require("../handlers");
const auth = require("../middlewares/auth");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/Documents');
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const imageFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(pdf)$/)) {
        return cb(new Error('You can upload only pdf files!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter});


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
router.route("/uploadDocument").post(auth,upload.single('offerLetter'), (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json(req.file);
});



router
  .route("/:id")
  .get(handle.getInternship)
  .delete(auth, handle.deleteInternship);

module.exports = router;
