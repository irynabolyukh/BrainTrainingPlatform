const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan'); 
const dotenv = require('dotenv').config();
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.static('public'));
app.use(express.json());

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
app.get('/', (req, res) => res.render('home'));
app.get('/games', (req, res) => res.render('games'));
app.use(authRoutes);

