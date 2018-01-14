require("dotenv").config();

const port = 3000;
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const cors = require('cors');
const bodyParser = require('body-parser');
const { json } = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const bcrypt = require('bcryptjs');

const app = express();

app.use(cors());
app.use(cookieParser());
// this is the build command for when we host the app, npm start builds it for us, so we finna leave it commented out til we done
// app.use(express.static(`${__dirname}/build`));
app.use(flash());

app.use(session({
  secret: process.env.secret,
  resave: true,
  saveUninitialized: true
}));

const connectionString = process.env.DATABASE_URL;
const massiveConnection = massive(connectionString)
.then(db => {
    app.set('db', db);
})
.catch(err => {
    console.log(err);
});

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, { user });
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Login Function
passport.use(new LocalStrategy(function (username, password, done) {
  const db = app.get('db');
  db.users.findOne({ 'username': username }).then(function (user) {
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


app.post('/api/registerUser', (req, res) => {
    const db = req.app.get('db');
    bcrypt.hash(req.body.password, 10).then((hash) => {
      req.body.password = hash;
      db.registerUser(req.body)
        .then(() => passport.authenticate('local'))
        .then(function() {
          res.send(req.session);
        });
    });
  });

app.post('/auth/login', passport.authenticate('local', { failureFlash: true }), (req, res) => {
    res.send({userid: req.session.passport.user.user.userid});
});

  // Auth Check Function
const isLoggedIn = function (req, res, next) {
  if (!req.user) {
    console.log('not logged in');
    return res.json('not logged in');
  }
  return next();
};

app.get('/authcheck', isLoggedIn, (req, res) => {
    res.json({ session: req.session });
});

app.get('/', (req, res)=>{
  const db = req.app.get('db');
  db.getUsers().then((response)=>{
    console.log(response)
  });
});

app.listen(port, function() {
  console.log(`server listening on ${port}`);
})
