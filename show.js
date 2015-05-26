var mongojs = require('mongojs');
var y = new Date();
var uri = "mongodb://localhost:27017/mongod";
var db = mongojs.connect(uri);

db = mongojs.connect(uri,["Prayer"]);

db.Prayer.find({}, function(err, result){
	console.log(result);
	db.close();
});





	