const app = require('./server/server');

app.listen(process.env.PORT || 3030, function() {
  console.log(`listening on port ${process.env.PORT}`);
});
