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

app.post('/login', function (req, res) {
  	//res.sendFile(__dirname + '/simple.html');
})

io.on('connection', function(socket)
{
	socket.on('login attempt', function(clientUsername,clientPassword)
	{
 		db.executeQuery(function(resp)
                {
                        console.log(resp);
                        console.log(resp[0].username);
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
	});
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
