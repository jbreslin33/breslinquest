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
                         var w = data["dir"];
                         var x = data["x"];
                         var y = data["y"];

                                if(w == "down")
                                    y += 5;

                                if(w == "up")
                                    y -= 5;

                                if(w == "left")
                                    x -= 5;

                                if(w == "right")
                                    x += 5;

                                console.log(y);

                                io.sockets.emit("_movement",{ "X" : x, "Y" : y});


                     });
});


app.listen(3000);
