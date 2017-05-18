var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

var pl = require('./processlogin');
var application = require('./application');


var loggedIn = false;
//	return res.redirect('/index.html');

app.get('/', function(req, res)
{
	if (loggedIn)
	{
  		res.sendFile(__dirname + '/index.html');
	}
	else
	{
  		res.sendFile(__dirname + '/form.html');
	}
});

app.post('/login', function (req, res) {
        var loggedIn = pl(req,res,application);
})


io.on('connection', function(socket)
{
	console.log('id connected:' + socket.id );
	application.mGameClientsArray.push(gc(socket.id));
  
	socket.on('chat message', function(msg)
	{
    		io.emit('chat message', msg);
  	});
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
