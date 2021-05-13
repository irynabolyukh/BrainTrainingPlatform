const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const roles = {
  Manager: 'manager', //manages content, edits posts
  Developer: 'developer', //manages games, can add new game, edits games
  User: 'user'
};

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Будь ласка, введіть мейл.'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Будь ласка, введіть коректний мейл.']
  },
  password: {
    type: String,
    required: [true, 'Будь ласка, введіть пароль.'],
    minLength: [8, 'Пароль має складатися не менше, ніж з 8 знаків.']
  },
  role: {
    type: String,
    required: true,
    default: roles.User
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

// method to check if Manager
userSchema.virtual('isManager').get(function() {
  return (this.role === roles.Manager);
});

// method to get User status
userSchema.virtual('status').get(function() {
  if (this.score >= 10000) {
    return "Досвідчений";
  } 
  if (this.score >= 1000) {
    return "Середній";
  }
  return "Початківець";
});

const User = mongoose.model('user', userSchema);

module.exports = User;