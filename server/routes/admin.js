const router = require('express').Router();
const handle = require('../handlers');
const auth = require('../middlewares/auth');

router.route("/:id")
.get(auth,handle.showProfile);

router.route("/add")
.post(auth,handle.addFaculty);

router.route("/find/:facID")
.get(auth,handle.findFacultyById);


router.route("/find")
.get(auth,handle.findAll);

//router.post('/login_faculty',handle.login_faculty);

// router.post('/register_faculty',handle.register_faculty);

router.post('/login_admin',handle.login_admin);

module.exports = router;