const router = require("express").Router();
const handle = require("../handlers");
const auth = require("../middlewares/auth");
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

router
  .route("/:id")
  .get(handle.getInternship)
  .delete(auth, handle.deleteInternship);

module.exports = router;
