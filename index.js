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
		var query_string = "SELECT username, password FROM users where username = '" + clientUsername + "';";
                var databaseConnectionInstance = new db(mApp,query_string);
		databaseConnectionInstance.executeQuery(clientUsername,socket.id);

		var userid = 0;

		//get user_id
		for (i=0; i < mApp.mUsersArray.length; i++)
		{
			if (mApp.mUsersArray[i].username == clientUsername)
			{
				userid = mApp.mUsersArray[i].id;	
				console.log('userid found:' + userid);
			} 
		} 
		
		var partyNameArray  = new Array();
		var partyIDArray    = new Array();
			 
		for (i=0; i < mApp.mPartiesArray.length; i++)
		{
			if (mApp.mPartiesArray[i].user_id == userid)
			{
				partyNameArray.push(mApp.mPartiesArray[i].name);
				partyIDArray.push(mApp.mPartiesArray[i].id);
			} 
		} 

		socket.emit('pick party',partyNameArray,partyIDArray);
	});
	socket.on('move attempt', function(move_key_code)
	{
		mApp.userMove(move_key_code,socket.id);
	});
	socket.on('picked party', function(party_id)
	{
		var user = mApp.getUserBySocketID(socket.id);
		user.setPartyID(party_id);
		console.log('picked this party:' + party_id + ' for ' + user.username);
		socket.emit('load game');
	});
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
