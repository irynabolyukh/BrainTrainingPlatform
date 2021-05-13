const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports.statistic = (req, res, next) =>{
    const token = req.cookies.jwt;

    // getting user from current session and displaying User statistic
    if (token){
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                next();
            }
            else {
                await User.findById(decodedToken.id).then(doc => {
                    if (doc) {
                        const date1 = doc.dayCreated.getTime();
                        const date2 = Date.now();
                        let days = Math.round((date2 - date1) / (1000 * 3600 * 24));
                        let months = Math.round((date2 - date1) / (1000 * 3600 * 24 * 30));
                        let years = Math.round((date2 - date1) / (1000 * 3600 * 24 * 30 * 12));
                        let scorePerDay = (!days) ? "день ще не минув" : (Math.round(doc.score / days * 10)/10) + " cls";
                        let scorePerMonth = (!months) ? "місяць ще не минув" : (Math.round(doc.score / months * 10)/10) + " cls";
                        let scorePerYear = (!years) ? "рік ще не минув" :  (Math.round(doc.score / years * 10)/10) + " cls";
                        res.status(200).json({
                            "scorePerDay" : scorePerDay,
                            "scorePerMonth" : scorePerMonth,
                            "scorePerYear" : scorePerYear
                        });
                    } else {
                        res.status(404).json({
                            message: "Користувач не знайдений"
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
        });
    }
}

module.exports.top = async (req, res, next) => {
    await User.find().sort('-score').then(doc => {
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({
                message: "Користувач не знайдений"
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