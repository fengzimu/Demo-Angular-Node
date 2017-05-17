/*
* @Author: YADONG
* @Date:   2017-05-11 22:31:02
* @Last Modified by:   fengzimu
* @Last Modified time: 2017-05-17 22:43:48
*/

var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactList',['contactList']);
var bodyParser = require('body-parser');
//public folder is where put index.html
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contactList', function(req, res){
	console.log("I received a GET request");
/*	person1 = {
		name: "Tim",
		email: "tim@email.com",
		number: "15383465424"
	};
	person2 = {
		name: "Lily",
		email: "lily@email.com",
		number: "15383465427"
	};
	person3 = {
		name: "Zhou",
		email: "zhou@email.com",
		number: "15383465420"
	};

	var contactList = [person1, person2, person3];
	//res.send(contactList);
	res.send(JSON.stringify(contactList));
	//res.send("hello");*/

	db.contactList.find(function(error,docs){
		console.log(docs);
		res.json(docs);
	});
});

app.post('/contactList',function(req, res) {
	/*optional stuff to do after success */
	console.log("post new contact: " + req.body);
	db.contactList.insert(req.body,function(err, doc){
		res.json(doc);
	});
});

app.delete('/contactList/:id', function(req, res){
	var id = req.params.id;
	console.log("delete one's id is: "+req.params.id);
	db.contactList.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

app.get('/contactList/:id', function(req, res){
	var id = req.params.id;
	console.log(id + "will be edit.");
	db.contactList.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

app.put('/contactList/:id', function(req, res){
	var id = req.params.id;
	console.log("update "+ req.body.name);
	db.contactList.findAndModify({query:{_id:mongojs.ObjectId(id)},
		update: {$set:{name: req.body.name, email: req.body.email, number: req.body.number}},
		new: true
	},	function(err, doc){
		res.json(doc);
	});
});

app.listen(3000);
console.log("Server running on port 3000");