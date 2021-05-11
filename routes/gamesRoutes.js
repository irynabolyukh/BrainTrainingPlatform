const {Router} = require('express');
const gamesController = require('../controllers/gamesController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = Router();

router.get('/games', requireAuth, (req, res) => res.render('games'));
router.get('/game-sequence', requireAuth, (req, res) => res.render('games/game-sequence'));
router.post('/update-score', gamesController.scoreUpdate);

module.exports = router;