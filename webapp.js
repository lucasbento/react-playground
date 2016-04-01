var express = require('express');
var app = express();

// app.get('/', function(req, res) {
//   res.send('Hello World!');
// });

// Serve static files placed into folder "static"
app.use(express.static('static'));

app.listen('3000', function() {
  console.log('App listening on port 3000');
});
