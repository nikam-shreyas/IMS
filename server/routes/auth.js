const router = require("express").Router();
const handle = require("../handlers");

const auth = require("../middlewares/auth");
router.post("/register", handle.register);
router.post("/login", handle.login);
router.post("/forgotpassword", handle.forgotPassword);
router.post("/login_faculty", handle.login_faculty);
router
  .post("/student", auth, handle.updateStudent)
  .get("/student", auth, handle.getStudentDetails);

router.route("/student/reset/:id").put(auth, handle.resetStudentPassword);


module.exports = router;
