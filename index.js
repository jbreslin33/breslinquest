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

app.post('/login', function (req, res) {
  	res.sendFile(__dirname + '/simple.html');
        //var loggedIn = pl(req,res,application);
})


io.on('connection', function(socket)
{
	socket.on('login attempt', function(clientUsername,clientPassword)
	{
		application.mGameClientsArray.push(gc(socket.id,clientUsername,clientPassword));
  	});
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
