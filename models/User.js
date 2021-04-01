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

// method to get User name
userSchema.virtual('name').get(function() {
  return this.email.substring(0, this.email.lastIndexOf("@"));
});

// method to get User status
userSchema.virtual('status').get(function() {
  if (this.score > 1000) {
    return "Proficient";
  } 
  if (this.score > 100) {
    return "Average";
  }
  return "Beginner"; 
});

const User = mongoose.model('user', userSchema);

module.exports = User;