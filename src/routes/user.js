const router = require('express').Router();

const { userController } = require('../controllers');

router.post('/signup', userController.signup);
router.get('/auth', userController.auth);
router.post('/login', userController.login);
router.get('/logout', userController.logout);

module.exports = router;
