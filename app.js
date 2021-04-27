const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan'); 
const dotenv = require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// logs
app.use(morgan('dev'));

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://brain-training:' + process.env.MONGO_ATLAS_PW + '@braintraining.p4zyl.mongodb.net/' + process.env.MONGO_ATLAS_NM;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(PORT))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/games', requireAuth, (req, res) => res.render('games'));
app.get('/game-ball', requireAuth, (req, res) => res.render('games/game-ball'));
app.use(authRoutes);
