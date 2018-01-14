const port = 3000;
var express = require('express');
var app = express();

app.get('/');

app.listen(port, function() {
  console.log(`server listening on ${port}`);
})
