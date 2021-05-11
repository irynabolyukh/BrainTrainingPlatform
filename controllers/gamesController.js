const User = require('../models/User');
const jwt = require('jsonwebtoken');

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