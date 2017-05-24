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
  	res.sendFile(__dirname + '/index.html');
});

app.post('/', function (req, res) 
{
})

io.on('connection', function(socket)
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
	socket.on('move attempt', function(move_key_code)
	{
		console.log('client id:' + socket.id + ' key_code:' + move_key_code);   
		
		//let loop thru clients and update this guy
 		for (i = 0; i < breslinApplicationInstance.mGameClientsArray.length; i++)
        	{
			if (breslinApplicationInstance.mGameClientsArray[i].mSocketID == socket.id)
			{
				console.log('found client and updating move:' + socket.id);

				/*

					0
				       3 1
					2
				*/
			 	if (move_key_code == 37)
				{
		
					breslinApplicationInstance.mGameClientsArray[i].mD = breslinApplicationInstance.mGameClientsArray[i].mD - 1;
					if (breslinApplicationInstance.mGameClientsArray[i].mD < 0)
					{
						 breslinApplicationInstance.mGameClientsArray[i].mD = 3;
					}	
				}		
			 	if (move_key_code == 39)
				{
		
					breslinApplicationInstance.mGameClientsArray[i].mD = breslinApplicationInstance.mGameClientsArray[i].mD + 1;
					if (breslinApplicationInstance.mGameClientsArray[i].mD > 3)
					{
						 breslinApplicationInstance.mGameClientsArray[i].mD = 0;
					}	
				}		
			 	if (move_key_code == 38)
				{
					if (breslinApplicationInstance.mGameClientsArray[i].mD == 0)
					{
						 breslinApplicationInstance.mGameClientsArray[i].mY = breslinApplicationInstance.mGameClientsArray[i].mY + 1 ;
					}	
					if (breslinApplicationInstance.mGameClientsArray[i].mD == 1)
					{
						 breslinApplicationInstance.mGameClientsArray[i].mX = breslinApplicationInstance.mGameClientsArray[i].mX + 1 ;
					}	
					if (breslinApplicationInstance.mGameClientsArray[i].mD == 2)
					{
						 breslinApplicationInstance.mGameClientsArray[i].mY = breslinApplicationInstance.mGameClientsArray[i].mY - 1 ;
					}	
					if (breslinApplicationInstance.mGameClientsArray[i].mD == 3)
					{
						 breslinApplicationInstance.mGameClientsArray[i].mX = breslinApplicationInstance.mGameClientsArray[i].mX - 1 ;
					}	
				}		

                                if (move_key_code == 40)
                                {
                                        if (breslinApplicationInstance.mGameClientsArray[i].mD == 0)
                                        {
                                                 breslinApplicationInstance.mGameClientsArray[i].mY = breslinApplicationInstance.mGameClientsArray[i].mY - 1 ;
                                        }
                                        if (breslinApplicationInstance.mGameClientsArray[i].mD == 1)
                                        {
                                                 breslinApplicationInstance.mGameClientsArray[i].mX = breslinApplicationInstance.mGameClientsArray[i].mX - 1 ;
                                        }
                                        if (breslinApplicationInstance.mGameClientsArray[i].mD == 2)
                                        {
                                                 breslinApplicationInstance.mGameClientsArray[i].mY = breslinApplicationInstance.mGameClientsArray[i].mY + 1 ;
                                        }
                                        if (breslinApplicationInstance.mGameClientsArray[i].mD == 3)
                                        {
                                                 breslinApplicationInstance.mGameClientsArray[i].mX = breslinApplicationInstance.mGameClientsArray[i].mX + 1 ;
                                        }
                                }




				console.log('id:' + socket.id + ' D:' + breslinApplicationInstance.mGameClientsArray[i].mD + ' X:' + breslinApplicationInstance.mGameClientsArray[i].mX + ' Y:' + breslinApplicationInstance.mGameClientsArray[i].mY + ' Z:' + breslinApplicationInstance.mGameClientsArray[i].mZ );  
			}
		}
	});
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
