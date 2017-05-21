var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

//my exports
var ba    = require('./application');
var gc    = require('./gameclient');
		
var breslinApplicationInstance = new ba();

app.get('/', function(req, res)
{
  	res.sendFile(__dirname + '/login_form.html');
});

app.post('/login', function (req, res) {
  	//res.sendFile(__dirname + '/simple.html');
})

io.on('connection', function(socket)
{
	socket.on('login attempt', function(clientUsername,clientPassword)
	{
		gcInstance = new gc(socket.id,clientUsername,clientPassword); 
		breslinApplicationInstance.mGameClientsArray.push(gcInstance);
		
		if (gcInstance.mLoggedIn == true)
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
