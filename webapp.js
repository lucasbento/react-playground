var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var bugs = [
	{
		id: 1,
		status: 'Open',
		priority: 'P1',
		owner: 'Joey',
		title: 'Joey Tribbiani does not share food.'
	},
	{
		id: 2,
		status: 'Closed',
		priority: 'P3',
		owner: 'Chandler',
		title: 'Ms. Chanandler Bong.'
	}
];

app.use(bodyParser.json());

app.get('/api/bugs', function(req, res) {
	return res.json(bugs);
});

app.post('/api/bugs', function(req, res) {
	var newBug = req.body.bug;
	newBug.id = bugs.length + 1;
	bugs.push(newBug);

	return res.json(newBug);
});

// Serve static files placed into folder "static"
app.use(express.static('static'));

app.listen('3000', function() {
	console.log('App listening on port 3000');
});
