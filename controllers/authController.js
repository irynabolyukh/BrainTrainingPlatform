const User = require('../models/User');
const jwt = require('jsonwebtoken');
const maxAge = 3 * 60 * 60; //3 hours in seconds

const errorChecking = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: ''};

  //incorrect email or password when logging
  if (err.message === 'wrong email'){
    errors.email = 'Неправильний мейл.';
  }
  if (err.message === 'wrong password'){
    errors.password = 'Неправильний пароль.';
  }

  //check for duplicate emails
  if (err.code === 11000){
    errors.email = 'Користувач з таким мейлом уже існує.';
    return errors;
  }

  //validation errors
  if (err.message.includes('user validation failed')){
    Object.values(err.errors).forEach(({properties}) => {
      errors[properties.path] = properties.message;
    })
  }

  return errors;
}

const createJWT = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: maxAge
  });
}

module.exports.getSignup = (req, res) =>{
  res.render('signup');
}

module.exports.getLogin = (req, res) =>{
  res.render('login');
}

module.exports.postSignup = async (req, res) =>{
  const {email, password} = req.body;

  try {
    const user = await User.create({email, password});
    const token = createJWT(user._id);
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
    res.status(201).json({user: user._id});
  }
  catch (err){
    const errors = errorChecking(err);
    res.status(400).json({errors});
  }
}

module.exports.postLogin = async (req, res) =>{
  const {email, password} = req.body;
  
  try{
    const user = await User.login(email, password);
    const token = createJWT(user._id);
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
    res.status(200).json({user: user._id});
  }
  catch(err){
    const errors = errorChecking(err);
    res.status(400).json({errors});
  }
}

module.exports.logout = (req, res) => {
  res.cookie('jwt', '', {httpOnly: true, maxAge: 1});
  res.redirect('/');
}