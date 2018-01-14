require("dotenv").config();

const port = 3000;
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const cors = require('cors');

const app = express();

app.use(cors());
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

app.get('/', (req, res)=>{
  const db = req.app.get('db');
  db.getUsers().then((response)=>{
    console.log(response)
  }
  )
});

app.listen(port, function() {
  console.log(`server listening on ${port}`);
})
