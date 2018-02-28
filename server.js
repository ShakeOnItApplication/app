const app = require('./server/server');
const port = process.env.PORT;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
