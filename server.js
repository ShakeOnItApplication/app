const app = require('./server/server');
const port = 3030;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
