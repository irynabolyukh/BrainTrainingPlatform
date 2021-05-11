const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Game = require("../models/Game");

module.exports.scoreUpdate = (req, res, next) =>{
    const {score} = req.body;
    const token = req.cookies.jwt;

    // getting user from current session and updating User score
    if (token){
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                next();
            }
            else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                let newScore = user.score + score;
                await User.updateOne({ _id: user.id}, { score: newScore });
                next();
            }
        });
    }
}

module.exports.createGame = async (req, res) =>{
    const {title, description, level, imageLink, pageLink} = req.body;

    try {
        const game = await Game.create({title, description, level, imageLink, pageLink});
        res.status(201).json({game: game._id});
    }
    catch (err){
        res.status(400).json({error: err});
    }
}

module.exports.updateGame = async (req, res) =>{
    const {gameId, title, description, level, imageLink, pageLink} = req.body;

    try {
        await Game.updateOne({ _id: gameId },{title, description, level, imageLink, pageLink});
        res.status(201).json({game: gameId});
    }
    catch (err){
        res.status(400).json({error: err});
    }
}