const router = require("express").Router();
const handle = require("../handlers");

const auth = require("../middlewares/auth");
router.post("/register", handle.register);
router.post("/login", handle.login);

//router.post('/register_faculty',handle.register_faculty);
router.post("/login_faculty", handle.login_faculty);
router.post("/student", auth, handle.updateStudent);
module.exports = router;
