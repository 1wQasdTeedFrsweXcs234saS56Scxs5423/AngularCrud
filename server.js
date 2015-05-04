// JavaScript Document
console.log('inside app.js. This is where the Logic may reside');

var express = require('express');
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + "/app"));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(bodyParser.json());

app.get('/contactlist', function(request, response){
		console.log("I received a GET request");
		
		db.contactlist.find(function(err, docs){
				console.log("THIS COMES FROM DB REQUEST " + docs);
				
				response.json(docs)
			});
	});

app.get('/', function(request, response){
		response.send("Hello World from server.js");
	});
	
app.post('/contactlist', function(request, response){
		console.log("I receiver a POST request" + request.body);
		
		db.contactlist.insert(request.body, function(err, doc){
				response.json(doc);
			});
	});

app.put('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.contactlist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.delete('/contactlist/:id', function(request, response){
		var id = request.params.id;
		
		console.log("On Server: This is the contact to be deleted " + id);
		
		db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
				response.json(doc);
			});
	});

app.get('/contactlist/:id', function(request, response){
		console.log("I received a GET request for a specific contact " + request.params.id);
		var id = request.params.id;
		db.contactlist.findOne({_id:mongojs.ObjectId(id)}, function(err, doc){
				console.log("########## "+ doc.name);
				response.json(doc);
			});
	});

app.listen(3000);

console.log("Server running on port 3000.... Yaaayyy");

