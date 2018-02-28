const app = require('./server/server');

app.listen(process.env.PORT, function() {
  console.log(`listening on port ${process.env.PORT}`);
});
