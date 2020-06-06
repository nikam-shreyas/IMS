const router = require("express").Router();
const handle = require("../handlers");
const auth = require("../middlewares/auth");

router
  .route("/")
  .get(handle.showInternships)
  .post(auth, handle.addNewInternship);

router.get("/student", auth, handle.studentsInternships);

router
  .route("/:id")
  .get(handle.getInternship)
  .delete(auth, handle.deleteInternship);

module.exports = router;
