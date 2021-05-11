// MVC approach; models, views, controllers in separate files
const {Router} = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.get('/signup', authController.getSignup);
router.get('/login', authController.getLogin);
router.post('/signup', authController.postSignup);
router.post('/login', authController.postLogin);
router.get('/logout', authController.logout);

module.exports = router;