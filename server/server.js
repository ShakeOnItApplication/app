require("dotenv").config();

const express = require('express');
const session = require('express-session');
const massive = require('massive');
const cors = require('cors');
const bodyParser = require('body-parser');
const { json } = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express();

app.use(cors());
app.use(cookieParser());
// this is the build command for when we host the app, npm start builds it for us, so we finna leave it commented out til we done
// app.use(express.static(`${__dirname}/build`));
app.use(flash());


const connectionString = process.env.DATABASE_URL;
const massiveConnection = massive(connectionString)
.then(db => {
  app.set('db', db);
})
.catch(err => {
  console.log(err);
});

app.use(session({
  secret: process.env.secret,
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Used to provide some identifying token that can be saved
// in the users session
passport.serializeUser((user, done) => {
  done(null, { user });
});

// The counterpart of 'serializeUser',  given only a user's ID, we must return
// the user object
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.post('/auth/login', passport.authenticate('local', { failureFlash: true }), (req, res) => {
    res.send({ user_id: req.session.passport.user.user.user_id });
});

app.post('/api/registerUser', (req, res) => {
    const db = req.app.get('db');
    bcrypt.hash(req.body.password, 10).then((hash) => {
      req.body.password = hash;
      db.registerUser(req.body)
        .then((response) => {
          res.send( response[0] );
        });
  });
});

// Login Function
passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, function (username, password, done) {
    const db = app.get('db');
    const Users = db.getUsers().then((users)=>{
    const user = users.filter(user=>user.username === username)[0];
    if (!user) {
      return done(null, false, {message: 'incorrect user'});
    }
    const authenticated = bcrypt.compareSync(password, user.password);

    if (!authenticated) {
      return done(null, false, {message: 'incorrect password'});
    }
    return done(null, user);
  });
}));

// User Check Function
const isLoggedIn = function (req, res, next) {
  if (!req.user) {
    console.log('not logged in');
    return res.json('not logged in');
  }
  return next();
};

// Gets Current User Info
app.get('/user/session', isLoggedIn, (req, res) => {
    const db = req.app.get('db');
    db.getUserInfo({ user_id: req.session.passport.user.user.user_id }).then(response => {
      res.send(response[0]);
    })
});

// Logout Function
app.get('/auth/logout', (req, res) => {
  req.logout();
  res.json('ok');
});

app.get('/', (req, res)=>{
  const db = req.app.get('db');
});

module.exports = app;
