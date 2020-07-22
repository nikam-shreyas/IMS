const router = require("express").Router();
const handle = require("../handlers");

const auth = require("../middlewares/auth");

router.route("/profile").get(auth, handle.showFacultyProfile);

router.route("/update/:id")
.put(auth,handle.updateFProfile);

router.route("/reset/:id")
.put(auth,handle.resetPassword);

module.exports = router;