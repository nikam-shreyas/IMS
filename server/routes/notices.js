const router = require("express").Router();
const handle = require("../handlers");
router.route("/").get(handle.showNotices).post(handle.addNewNotice);
router.route("/student").get(handle.studentsNotices);
router.route("/:id").delete(handle.deleteNotice);

module.exports = router;
