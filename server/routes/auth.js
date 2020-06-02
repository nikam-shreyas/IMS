const router = require('express').Router();
const handle = require('../handlers');

router.post('/register',handle.register);
router.post('/login',handle.login);

//router.post('/register_faculty',handle.register_faculty);
router.post('/login_faculty',handle.login_faculty);

module.exports = router;