const {Router} = require('express');
const postController = require('../controllers/postController');
const {requireAuth} = require("../middleware/authMiddleware");

const router = Router();

router.get('/update-post', requireAuth, postController.updateGet);
router.post('/update-post', requireAuth, postController.updatePost);

module.exports = router;