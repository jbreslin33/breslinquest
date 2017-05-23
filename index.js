var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

require ('mootools');

//my exports
var ba    = require('./application');
var gc    = require('./gameclient');
var db    = require('./db');

var breslinApplicationInstance = new ba();


app.get('/', function(req, res)
{
  	res.sendFile(__dirname + '/login_form.html');
});

var io_login = io.of('/login');  
io_login.on('connection', function(socket){  
    console.log('Connected to login namespace');
});
//iosa.emit('stats', { data: 'some data' });  

io_login.on('connection', function(socket)
{
	console.log('callin io_login connection');
	socket.on('login attempt', function(clientUsername,clientPassword)
	{
		console.log('callin login attempt in io_login connection on server');
	});
});

app.post('/', function (req, res) {
  	//res.sendFile(__dirname + '/simple.html');
	console.log('callin login  on server');
})

io.on('connection', function(socket)
{
	socket.on('login attempt', function(clientUsername,clientPassword)
	{
		console.log('callin login attempt on server');
		/*
		var query_string = "SELECT username, password FROM users where username = '" + clientUsername + "';";
		var databaseConnectionInstance = new db(query_string);
 		databaseConnectionInstance.executeQuery(function(resp)
                {
                        //console.log(resp);
                        //console.log(resp[0].username);
                        if (resp[0].username == 'jbreslin')
                        {
                                //return true;
				console.log('send load');
				socket.emit('load game');
                        }
                        else
                        {
                                //return false;
				console.log('we have a problem');
                        }
                });
		*/
	});
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
