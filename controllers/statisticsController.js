const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports.my_statistic = (req, res, next) =>{
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

module.exports.top = async (req, res, next) => {
    await User.find().sort('-score').then(doc => {
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({
                message: "No users found"
            });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
    next();
}