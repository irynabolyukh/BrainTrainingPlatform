const {Router} = require('express');
const gamesController = require('../controllers/gamesController');

const router = Router();

router.post('/update-score', gamesController.update_score);

module.exports = router;