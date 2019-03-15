var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

var url = 'https://latelier.co/data/cats.json';
var add = 0;

// get route to see the cats
app.get('/vote', function(req, res) {
	request(url, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			// convert json object into js object
			var data = JSON.parse(body);
			res.render('vote', {
				data: data
			});
		}
	});
});

//post route for vote the cats

app.post('/vote', function(req, res) {
	var vote = req.body.addVote;
	var num = Number(vote);
	// var numVote = Number(vote);
	console.log(Number(vote));
	add += num;
	console.log(add);

	// console.log(addVote);
	res.redirect('score');
});

// to see the score of the cats
app.get('/score', function(req, res) {
	request(url, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			// convert json object into js object
			var data = JSON.parse(body);
			var added = add;
			res.render('score', {
				data: data,
				added: added
			});
		}
	});
});

// default route
app.get('*', function(req, res) {
	res.redirect('/vote');
});

app.set('port', process.env.PORT || 5000);

// Start node server
app.listen(app.get('port'), function() {
	console.log('Node server is running on port ' + app.get('port'));
});
