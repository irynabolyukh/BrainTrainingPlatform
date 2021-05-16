const {Router} = require('express');
const gamesController = require('../controllers/gamesController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = Router();

router.get('/games', requireAuth, (req, res) => res.render('games'));
router.get('/game-sequence', requireAuth, (req, res) => res.render('games/game-sequence'));
router.get('/game-color', requireAuth, (req, res) => res.render('games/game-color'));
router.get('/game-words', requireAuth, (req, res) => res.render('games/game-words'));
router.post('/update-score', requireAuth, gamesController.scoreUpdate);

router.get('/add-game', requireAuth, (req, res) => res.render('add-game'));
router.get('/update-game/:gameId', requireAuth, (req, res) => res.render('update-game'));
router.get('/game/:gameId', requireAuth, gamesController.getGame);
router.post('/add-game', requireAuth, gamesController.createGame);
router.post('/update-game', requireAuth, gamesController.updateGame);
router.post('/delete-game/:gameId', requireAuth, gamesController.deleteGame);

module.exports = router;