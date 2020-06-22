const router = require("express").Router();
const handle = require("../handlers");
const auth = require("../middlewares/auth");
router
  .route("/")
  .get(auth, handle.showInternships)
  .post(auth, handle.addNewInternship);

router.get("/student", auth, handle.studentsInternships);

router
  .route("/faculty")
  .post("/forward", auth, handle.forwardInternship)
  .post("/approve", auth, handle.approveInternship)
  .post("/update", auth, handle.updateInternship);

router
  .route("/:id")
  .get(handle.getInternship)
  .delete(auth, handle.deleteInternship);

module.exports = router;
