var config = require('./config');
var mongo = require('mongodb').MongoClient;
var events = require('events').EventEmitter();
var _db;

function findBugs() {
	return new Promise(function(fulfill, reject) {
		_db.collection('bugs').find({}).toArray(function(err, bugs) {
			if (err)
				reject(err);

			console.log(bugs);

			fulfill(bugs);
		});
	});
}

function addBug(bug) {
	return new Promise(function(fulfill, reject) {
		_db.collection('bugs').insertOne(bug, function(err, result) {
			if (err)
				reject(err);
console.log(result.insertedId);
			_db.collection('bugs').find({ _id: result.insertedId }).next(function(err, newBug) {
				console.log(newBug);
				if (err)
					reject(err);

				fulfill(newBug);
			});
		});
	});
}

mongo.connect(config.url, function(err, db) {
	if (err)
		console.log('Error connecting to DB', db);

	_db = db;
});

module.exports = {
	findBugs: findBugs,
	addBug: addBug
};
