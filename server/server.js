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
const stripe = require('stripe')(process.env.stripe_id);

// const OAuth = require('oauthio');
// OAuth.initialize('N5gG9OERPCQ1B8UwbCA9gJxbjgU', `${process.env.oauth_secret}`);

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
      stripe.customers.create(
    { email: req.body.email },
    function(err, customer) {
      if(!err){ // null if no error occurred
        stripe.customers.createSource(
          customer.id,
          { source: {
              object: 'card',
              exp_month: req.body.exp_month,
              exp_year: req.body.exp_year,
              number: req.body.number,
              cvc: req.body.cvc
          }},
          function(err, card) {
            if (!err){
              const db = req.app.get('db');
              bcrypt.hash(req.body.password, 10).then((hash) => {
                req.body.password = hash;
                db.registerUser(req.body)
                  .then((response) => {
                    res.send( response[0] );
                  });
            });
            } else {
              console.log(err);
            }
          }
        );
      } else {
        console.log(err);
      } 
    }
    );
});

// Login Function
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function (email, password, done) {
    const db = app.get('db');
    const Users = db.getUsers().then((users)=>{
    const user = users.filter(user=>user.email === email)[0];
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

app.post('/api/getAllBets', (req, res) => {
  const db = req.app.get('db');
  db.getAllBets(req.body).then(response => {
    res.send(response);
  })
})

// Logout Function
app.get('/auth/logout', (req, res) => {
  req.logout();
  res.json('ok');
});

app.get('/api/test', (req, res)=>{
  const db = req.app.get('db');
});

app.post('/api/placeBet', (req, res) => {
  const db = req.app.get('db');
  console.log(req.body);
  db.placeBet(req.body).then((response)=>{
    console.log(response);
    res.send(response);
  })
})

app.post('/api/findUser', (req, res) => {
  const db = req.app.get('db');
  db.findUser(req.body).then(response => res.send(response));
})

module.exports = app;


// create card for customer
// stripe.customers.createSource(
//   "cus_CBdeswtHe0jgdA",
//   { source: {
//       object: 'card',
//       exp_month: '11',
//       exp_year: '22',
//       number: '4242424242424242',
//       cvc: '729'
//   }},
//   function(err, card) {
//     console.log(err, card);
//   }
// );

// create stripe customer
// stripe.customers.create(
//   { email: 'customer@example.com' },
//   function(err, customer) {
//     err; // null if no error occurred
//     customer; // the created customer object
//   }
// );