require("dotenv").config();

const express = require("express");
const session = require("express-session");
const massive = require("massive");
const cors = require("cors");
const bodyParser = require("body-parser");
const { json } = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const path = require('path');
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const app = express();

app.engine('html', require('ejs').renderFile);

app.use(cors());
app.use(cookieParser());
// this is the build command for when we host the app, npm start builds it for us, so we finna leave it commented out til we done
app.use(express.static((__dirname + '/public')));
// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
app.use(flash());

const connectionString = process.env.DATABASE_URL;
const massiveConnection = massive(connectionString)
  .then(db => {
    app.set("db", db);
  })
  .catch(err => {
    console.log(err);
  });

app.use(
  session({
    secret: process.env.secret,
    resave: true,
    saveUninitialized: true
  })
);

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

app.get('/', function(req, res) {
  res.render('index.html');
});

const stripeCtrl = require("./stripe/stripeCtrl");
const betCtrl = require("./bets/betCtrl");

app.post("/api/registerUser", stripeCtrl.registerUser);

app.post("/api/stripe/placeBet", stripeCtrl.placeBet);
app.post("/api/stripe/handleBet", stripeCtrl.handleBet);
app.post("/api/stripe/settleBet", stripeCtrl.settleBet);

app.post("/api/getPendingBets", betCtrl.getPendingBets);
app.post("/api/getActiveBets", betCtrl.getActiveBets);
app.post('/api/getPastBets', betCtrl.getPastBets);
app.post('/api/counterBet', betCtrl.counterBet);

app.post("/api/getAllBets", (req, res) => {
  const db = req.app.get("db");
  db.getAllBets(req.body).then(response => {
    res.send(response);
  });
});

// Logout Function
app.get("/auth/logout", (req, res) => {
  req.logout();
  res.json("ok");
});

app.get("/api/test", (req, res) => {
  const db = req.app.get("db");
});

app.post("/api/findUser", (req, res) => {
  const db = req.app.get("db");
  db.findUser(req.body).then(response => res.send(response));
});

// Login Function

app.post(
  "/auth/login",
  passport.authenticate("local", { failureFlash: true }),
  (req, res) => {
    res.send({ user_id: req.session.passport.user.user.user_id });
  }
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    function(email, password, done) {
      const db = app.get("db");
      const Users = db.getUsers().then(users => {
        const user = users.filter(user => user.email === email)[0];
        if (!user) {
          return done(null, false, { message: "incorrect user" });
        }
        const authenticated = bcrypt.compareSync(password, user.password);

        if (!authenticated) {
          return done(null, false, { message: "incorrect password" });
        }
        return done(null, user);
      });
    }
  )
);

// User Check Function
const isLoggedIn = function(req, res, next) {
  if (!req.user) {
    console.log("not logged in");
    return res.json("not logged in");
  }
  return next();
};

// Gets Current User Info
app.get("/user/session", isLoggedIn, (req, res) => {
  const db = req.app.get("db");
  db
    .getUserInfo({ user_id: req.session.passport.user.user.user_id })
    .then(response => {
      res.send(response[0]);
    });
});


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
