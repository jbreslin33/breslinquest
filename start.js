var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

//my exports
//var application = require('./application');
var gc          = require('./gameclient');

var mGameClientsArray = [];



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
		//var gC = new gc(socket.id,clientUsername,clientPassword); 
		mGameClientsArray.push(gc(socket.id,clientUsername,clientPassword));
		//console.log('socketID:' + mGameClientsArray[0].mSocketID);
		console.log('length:' + mGameClientsArray.length);
		for (i=0; i < mGameClientsArray.length; i++)
		{
			console.log('arr:' + mGameClientsArray[i].mClientUsername);

		}
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
