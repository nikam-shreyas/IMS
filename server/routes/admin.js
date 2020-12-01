const router = require("express").Router();
const handle = require("../handlers");
const auth = require("../middlewares/auth");

router.route("/").get(auth, handle.showProfile);

router.route("/all").get(auth, handle.findAll);

router.route("/allStudents").get(auth, handle.findAllStudents);

router.route("/findStudents").get(auth, handle.SomeStudents);

router.route("/deletestudent").put(auth, handle.deletestudent);

router.route("/update/:id").put(auth, handle.updateProfile);

router.route("/add").post(auth, handle.addFaculty);

router
  .route("/find/:user")
  .get(auth, handle.findFaculty)
  .delete(auth, handle.deleteFaculty);

router.route("/update/:id").put(auth, handle.updateProfile);

router.route("/reset/:id").put(auth, handle.resetPassword);

router.post("/login_admin", handle.login_admin);

module.exports = router;
