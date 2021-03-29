const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan'); 

const app = express();

// middleware
app.use(express.static('public'));

// logs
app.use(morgan('dev'));

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://node-mailer:node-mailer@node-rest-mailer.p4zyl.mongodb.net/node-mailer?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/games', (req, res) => res.render('games'));