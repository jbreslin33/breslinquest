var http = require('http'),
    fs = require('fs'),
    // NEVER use a Sync function except at start-up!
    index = fs.readFileSync(__dirname + '/index.html');

// Send index.html to all requests
var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

// Socket.io server listens to our app
var io = require('socket.io').listen(app);

// Send current time to all connected clients
function sendTime() {
    io.emit('time', { time: new Date().toJSON() });
}

// Send current time every 10 secs
setInterval(sendTime, 10000);

// Emit welcome message on connection
io.on('connection', function(socket) {
	// Use socket to communicate with this particular client only, sending it it's own id
    	socket.emit('welcome', { message: 'Welcome!', id: socket.id });

    	socket.on('i am client', console.log);

	socket.on('move', function(data)
        {
        	var m = data["m"];
                if(m == 37)
		{
			//turn left 
		}
                if(m == 38)
		{	
			//go forward 
		}
                if(m == 39)
		{
			//turn right 
		}
                if(m == 40) 
		{
			//back up 
		}

                console.log(m);

                //io.sockets.emit("_movement",{ "m" : m});
    		socket.emit    ('my_move'  ,{ "m": m, id: socket.id });
	});
});


app.listen(3000);
