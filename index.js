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

setInterval(onTimerTick, 33);

function onTimerTick()
{
	for (i = 0; i < breslinApplicationInstance.mGameClientsArray.length; i++)
	{
		if (breslinApplicationInstance.mGameClientsArray[i].mLoggedIn == false)
                {
			//console.log('client: ' + i + ' is not logged in');
                }
                else
                {
                	//console.log('client: ' + i + ' is logged in');
                }
	}
}

/******************
	ROOT NAMESPACE
*****************/
app.get('/', function(req, res)
{
  	res.sendFile(__dirname + '/login_form.html');
});

app.post('/', function (req, res) {
  	//res.sendFile(__dirname + '/simple.html');
})

/******************
	LOGIN NAMESPACE
//iosa.emit('stats', { data: 'some data' });  
*****************/
//root namespace above will will return page to client which will take us into login namespace

app.post('/login', function (req, res) {
  	//res.sendFile(__dirname + '/simple.html');
})

var io_login = io.of('/login'); 
 
io_login.on('connection', function(socket)
{
	socket.on('login attempt', function(clientUsername,clientPassword)
	{
		var gameClientInstance = new gc(breslinApplicationInstance,socket.id,clientUsername,clientPassword);
		breslinApplicationInstance.addGameClient(gameClientInstance);
		var query_string = "SELECT username, password FROM users where username = '" + clientUsername + "';";
                var databaseConnectionInstance = new db(breslinApplicationInstance,query_string);
		databaseConnectionInstance.executeQuery();

		socket.emit('load game');
	});
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
