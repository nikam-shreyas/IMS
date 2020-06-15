const router = require("express").Router();
const handle = require("../handlers");
const auth = require("../middlewares/auth");

router.route("/all").get(auth, handle.findAll);

router.route("/")
.get(auth,handle.showProfile);

router.route("/update/:id")
.put(auth,handle.updateProfile);

router.route("/add")
.post(auth,handle.addFaculty);

router
  .route("/find/:user")
  .get(auth, handle.findFaculty)
  .delete(auth, handle.deleteFaculty);

router.route("/update/:id")
.put(auth,handle.updateProfile);

router.route("/reset/:id")
.put(auth,handle.resetPassword);


//router.post('/login_faculty',handle.login_faculty);

// router.post('/register_faculty',handle.register_faculty);

router.post("/login_admin", handle.login_admin);

module.exports = router;