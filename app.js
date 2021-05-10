const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const gamesRoutes = require('./routes/gamesRoutes');
const statisticsRoutes = require('./routes/statisticsRoutes');
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


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// routes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});
app.get('*', checkUser); //to set user for ejs-templates
app.get('/', (req, res) => res.render('home'));
app.get('/test', requireAuth, (req, res) => res.render('test'));
app.use(authRoutes);
app.use(gamesRoutes);
app.use(statisticsRoutes);

