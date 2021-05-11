const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Post = require("../models/Post");
const Game = require("../models/Game");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token){
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } 
      else {
        console.log(decodedToken);
        next();
      }
    });
  } 
  else {
    res.redirect('/login');
  }
}


//check current user and post content and games
const checkUserAndGetLocals = async (req, res, next) => {
  const token = req.cookies.jwt;
  res.locals.post = await Post.findOne({});
  res.locals.manager = false;
  res.locals.developer = false;
  res.locals.games = null;

  if (token){
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } 
      else {
        console.log(decodedToken);
        //res.locals is gonna be available in the views
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        if (user.role === "manager") {
          res.locals.manager = true;
        }
        if (user.role === "developer") {
          res.locals.developer = true;
        }
        res.locals.games = await Game.find({});
        next();
      }
    });
  } 
  else {
    res.locals.user = null;
    next();
  }
}

module.exports = { requireAuth, checkUserAndGetLocals };