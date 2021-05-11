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
const checkLocals = (req, res, next) => {
  const token = req.cookies.jwt;

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
        res.locals.user = await User.findById(decodedToken.id);
        res.locals.post = await Post.findOne({});
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

module.exports = { requireAuth, checkLocals };