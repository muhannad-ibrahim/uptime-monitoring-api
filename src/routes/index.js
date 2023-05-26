const router = require('express').Router();
const cookieParser = require('cookie-parser');

router.use(cookieParser());
router.use('/user', require('./user'));
router.use('/check', require('./check'));

module.exports = router;
