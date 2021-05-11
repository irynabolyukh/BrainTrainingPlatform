const {Router} = require('express');
const statisticsController = require('../controllers/statisticsController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = Router();

router.get('/top', statisticsController.top);
router.get('/my-statistic', requireAuth, statisticsController.statistic);

module.exports = router;