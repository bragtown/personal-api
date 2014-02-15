
var express = require('express'); //includes express module 

var app = express();//created a new app with express.

app.listen(12200);

app.configure(function(){
	app.use(express.bodyParser());
	app.use(function(request, response, next){
		response.setHeader('Access-Control-Allow-Origin');
		response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
		response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		next();
	});
});

var name = {name: "Jordan"};
var location = {location: "Spanish Fork, UT"};
var hobbies = {hobbies: ["ultimate frisbee", "starcraft 2", "coding!"]};
var occupations = {occupations: ["physical therapy aide", "pizza guy", "assistant manager"]};
var latest = {latest: "Physical therapy aide"};
var mentions = {mentions: []};
var friends = {friends: []};
var skills = {skills: [{
id: '1',
name: 'javascript',
experience: 'intermediate'
},{
id: '2',
name: 'html',
experience: 'intermediate'
},{
id: '3',
name: 'css',
experience: 'intermediate'
}]};

app.get('/name', function (request, response){ //defines root path of our function. if someone does a get request, handle it here
	response.type('application/json');
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.send(name.name);
});

app.get('/location', function (request, response){ //defines root path of our function. if someone does a get request, handle it here
	response.type('application/json');
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.send(location.location);
});

app.get('/hobbies', function (request, response){ //defines root path of our function. if someone does a get request, handle it here
	response.type('application/json');
	response.setHeader('Access-Control-Allow-Origin', '*');
	if (request.query.order === "asc"){
		hobbies.hobbies.sort();
	};
	if (request.query.order === "desc"){
		hobbies.hobbies.sort().reverse();
	};
	response.send(hobbies);
});	

app.get('/occupations', function (request, response){ //defines root path of our function. if someone does a get request, handle it here
	response.type('application/json');
	response.setHeader('Access-Control-Allow-Origin', '*');
	if (request.query.order === "asc"){
		occupations.occupations.sort();
	};
	if (request.query.order === "desc"){
		occupations.occupations.sort().reverse();
	};			
	response.send(occupations.occupations);
});

app.get('/occupations/latest', function (request, response){ //defines root path of our function. if someone does a get request, handle it here
	response.type('application/json');
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.send(latest.latest);
});
app.post('/mentions', function (request, response){
	mentions.mentions.push(request.body.mentioned);
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.type('application/json');
	response.send(request.body);
});
app.get('/mentions', function (request, response){ //defines root path of our function. if someone does a get request, handle it here
	response.type('application/json');
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.send(mentions.mentions);
});
app.post('/friends', function (request, response){
	friends.friends.push(request.body.friend);
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.type('application/json');
	response.send(request.body);
});
app.get('/friends', function (request, response){ //defines root path of our function. if someone does a get request, handle it here
	response.type('application/json');
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.send(friends.friends);
});
app.get('/skills', function (request, response){ //defines root path of our function. if someone does a get request, handle it here
	response.type('application/json');
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.send(skills.skills);
});
app.get('/skills/:id', function (request, response){ //defines root path of our function. if someone does a get request, handle it here
	response.type('application/json');
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.send(skills.skills[request.query.id - 1]);
});
app.post('/skills', function (request, response){
	skills.skills.push(request.body);
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.type('application/json');
	response.send(request.body);	
});
app.put('/skills/:id', function (request, response){
	response.setHeader('Access-Control-Allow-Origin', '*');
	if (request.body.experience){
		skills.skills[request.query.id -1].experience = request.body.experience;
	}
	if (request.body.name){
		skills.skills[request.query.id -1].name = request.body.name;
	}
	response.send(skills.skills[request.query.id -1].experience);
});
app.delete('/skills/:id', function (request, response){ //defines root path of our function. if someone does a get request, handle it here
	response.type('application/json');
	response.setHeader('Access-Control-Allow-Origin', '*');
	delete skills.skills[request.query.id - 1];
	response.send("deleted");
});