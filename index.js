var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

//my exports
var pl          = require('./processlogin');
var application = require('./application');
var gc          = require('./gameclient');

app.get('/', function(req, res)
{
  	res.sendFile(__dirname + '/login_form.html');
});
/*
app.post('/login', function (req, res) {
        var loggedIn = pl(req,res,application);
})
*/


io.on('connection', function(socket)
{
	socket.on('login attempt', function(clientUsername,clientPassword)
	{
		console.log('loginAttempt clientUsername:' + clientUsername + ' clientPassword:' + clientPassword);
		application.mGameClientsArray.push(gc(socket.id,clientUsername,clientPassword));
		application.printLog('helllll');
  	});
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
