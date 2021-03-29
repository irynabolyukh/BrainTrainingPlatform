// MVC approach; models, views, controllers in separate files
const {Router} = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.get('/signup', authController.signup_get);
router.get('/login', authController.login_get);
router.post('/signup', authController.signup_post);
router.post('/login', authController.login_post);
// router.get('/logout', () => {});

module.exports = router;