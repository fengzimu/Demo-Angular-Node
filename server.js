/*
* @Author: YADONG
* @Date:   2017-05-11 22:31:02
* @Last Modified by:   YADONG
* @Last Modified time: 2017-05-15 23:14:11
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
		res.send(JSON.stringify(docs));
	});
});

app.post('/contactList',function(req, res) {
	/*optional stuff to do after success */
	console.log("post new contact: " + req.body);
	db.contactList.insert(req.body,function(err, doc){
		res.json(doc);
	});
});

app.listen(3000);
console.log("Server running on port 3000");