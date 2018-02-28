const app = require('./server/server');
const port = process.env.PORT;

app.listen(process.env.PORT || 3030, function() {
  console.log(`listening on port ${port}`);
});
