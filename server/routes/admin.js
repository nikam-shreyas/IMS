const router = require('express').Router();
const handle = require('../handlers');
const auth = require('../middlewares/auth');

// router.route('/')
// .get(handle.showProfile);

// router.route('/addTeacher')
// .post(auth,handle.addTeacher);

// router.route('/addCoordinator')
// .post(auth,handle.AddCoordinator);

// router.route('/findall')
// .post(auth,handle.findall);

module.exports = router;