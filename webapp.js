var express = require('express');
var app = express();

app.get('/api/bugs', function(req, res) {
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

	res.json(bugs);
});

// Serve static files placed into folder "static"
app.use(express.static('static'));

app.listen('3000', function() {
	console.log('App listening on port 3000');
});
