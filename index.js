var express = require('express');
var path = require('path');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

require ('mootools');

//my exports
var ba    = require('./application');
var User  = require('./user');
var db    = require('./db');

var mApp = new ba();

setInterval(onTimerTick, 33);

function onTimerTick()
{
	for (i = 0; i < mApp.mUsersArray.length; i++)
	{
		if (mApp.mUsersArray[i].mLoggedIn == false)
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
  	res.sendFile(__dirname + '/index.html');
});

app.post('/', function (req, res) 
{
})

io.on('connection', function(socket)
{
	socket.on('login attempt', function(clientUsername,clientPassword)
	{
		var user = new User(mApp,socket.id,clientUsername,clientPassword);
		mApp.addUser(user);
		var query_string = "SELECT username, password FROM users where username = '" + clientUsername + "';";
                var databaseConnectionInstance = new db(mApp,query_string);
		databaseConnectionInstance.executeQuery();

		socket.emit('pick party');
	});
	socket.on('move attempt', function(move_key_code)
	{
		mApp.updateUser(move_key_code,socket.id);
	});
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
