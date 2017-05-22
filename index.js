var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

require ('mootools');


//my exports
var ba    = require('./application');
var gc    = require('./gameclient');
var p2D    = require('./Point2D');
var db    = require('./db');

var point2DInstance = new p2D(3,7); 

console.log('x:' + point2DInstance.mX);
		
var breslinApplicationInstance = new ba();

app.get('/', function(req, res)
{
  	res.sendFile(__dirname + '/login_form.html');
});

app.post('/login', function (req, res) {
  	//res.sendFile(__dirname + '/simple.html');
})

db.executeQuery(function(resp)
{
	console.log(resp);
	console.log(resp[0].username);
});

io.on('connection', function(socket)
{
	socket.on('login attempt', function(clientUsername,clientPassword)
	{
		gcInstance = new gc(socket.id,clientUsername,clientPassword); 
		breslinApplicationInstance.addGameClient(gcInstance);
		var loggedIn = false;
		loggedIn = gcInstance.checkLogin('jbreslin','Iggles_13');
		
		if (loggedIn == true)
		{
			//io.emit('load game', 'load game');
			console.log('gc logged in true');
		}
		else
		{
			console.log('gc logged in false');
		}

		//console.log('socketID:' + breslinApplicationInstance.mGameClientsArray[0].mSocketID);
		//console.log('length:' + breslinApplicationInstance.mGameClientsArray.length);
/*
		for (i=0; i < breslinApplicationInstance.mGameClientsArray.length; i++)
		{
			console.log('arr:' + breslinApplicationInstance.mGameClientsArray[i].mClientUsername);

		}
*/
		//console.log('arr:' + application.mGameClientsArray[0].mClientUsername);
		//if (gC.mLoggedIn == true)
		//{
			//io.emit('load game', 'load game');
		//}
  	});

	//io.emit('load game', 'load game');
  
	//this.mIO.sockets.emit('load game', "load game");
	//io.sockets.emit('load game', "load game");

});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
