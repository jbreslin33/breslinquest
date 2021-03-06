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

var mApp = new ba(io);

setInterval(onTimerTick, 33);

//game loop check for collisions
function onTimerTick()
{
	//collision check should destroy battles as well.....
	mApp.update();
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
		databaseConnectionInstance.executeQuery(clientUsername,socket.id,socket);

		var userid = 0;

		//get user_id
		for (i=0; i < mApp.mUsersArray.length; i++)
		{
			if (mApp.mUsersArray[i].username == clientUsername)
			{
				userid = mApp.mUsersArray[i].id;	
			} 
		} 
		if (userid != 0)
		{
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
		}
	});
	socket.on('move attempt', function(move_key_code)
	{
		mApp.storeUserMoves(move_key_code,socket.id);
	});
	socket.on('picked party', function(party_id)
	{
		var user = mApp.getUserBySocketID(socket.id);
		user.setPartyID(party_id);
		var dmParty = mApp.getPartyByID(party_id);
		
		if (user.username == 'd' && user.password == 'm')
		{
			//pictures
			var picturesIDArray = new Array();
			var picturesNameArray = new Array();
			for (var p=0; p < mApp.mPicturesArray.length; p++)
			{
				var picture = mApp.mPicturesArray[p];	
				picturesIDArray.push(picture.id);
				picturesNameArray.push(picture.name);
			}

			//parties
       			var partyNameArray  = new Array();
                        var partyIDArray    = new Array();

                        for (i=0; i < mApp.mPartiesArray.length; i++)
                        {
				var party = mApp.mPartiesArray[i];
                                if (mApp.mPartiesArray[i].user_id == null && party.x == dmParty.x && party.y == dmParty.y && party.z == dmParty.z)
                                {
                                        partyNameArray.push(mApp.mPartiesArray[i].name);
                                        partyIDArray.push(mApp.mPartiesArray[i].id);
                                }
                        }

                        //race
                        var raceIDArray = new Array();
                        var raceNameArray = new Array();
                        for (var p=0; p < mApp.mRaceArray.length; p++)
                        {
                                var race = mApp.mRaceArray[p];
                                raceIDArray.push(race.id);
                                raceNameArray.push(race.name);
                        }

			socket.emit('load dm game',picturesIDArray,picturesNameArray,partyIDArray,partyNameArray,raceIDArray,raceNameArray);
		}
		else
		{
			socket.emit('load game');
		}
	});
        socket.on('dm add party', function()
        {
                mApp.dmAddParty(socket.id);
        });
        socket.on('build wall', function(pictureid,passableid)
        {
                mApp.buildWall(socket.id,pictureid,passableid);
        });
        socket.on('dm add character to party', function(partyid,raceid)
        {
                //mApp.buildWall(socket.id,pictureid,passableid);
                mApp.dmAddCharacter(partyid,raceid);
		console.log('partyid:' + partyid + ' raceid:' + raceid); 
        });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
