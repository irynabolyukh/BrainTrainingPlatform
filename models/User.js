const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email.'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email.']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password.'],
    minLength: [8, 'Password length should not be less than 8.']
  },
  score: {
    type: Number,
    required: true,
    default: 0
  },
  dayCreated: {
    type: Date, 
    required: true,
    default: Date.now
  }
});

//do this before new user was saved to db
userSchema.pre('save', async function(next){
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// method to login User
userSchema.statics.login = async function(email, password){
  const user = await this.findOne({email}); // find by email in db
  if (user){
    const auth = await bcrypt.compare(password, user.password);
    if (auth){
      return user;
    }
    throw Error('wrong password');
  }
  throw Error('wrong email');
}

const User = mongoose.model('user', userSchema);

module.exports = User;