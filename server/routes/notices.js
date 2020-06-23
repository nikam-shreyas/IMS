const router = require("express").Router();
const handle = require("../handlers");
const auth = require("../middlewares/auth");

router.route("/")
.get(handle.showNotices)
.post(handle.addNewNotice);
router.route("/student")
.get(auth, handle.studentsNotices);
router.route("/:id")
.delete(handle.deleteNotice);

module.exports = router;