
var GameClient = new Class(
{
        initialize: function(socketid,clientUsername,clientPassword)
        {
        	this.mSocketID = socketid;
        	this.mUserID = 0;
        	this.mClientUsername = clientUsername;
        	this.mClientPassword = clientPassword;
        	this.mServerUsername = 0;
        	this.mServerPassword = 0;

        	this.mLoggedIn = false;
        },
	
	jesus: function(cb,p)
	{
		//console.log('cb:' + cb);	
	},

        checkLogin: function(clientUsername,clientPassword)
        {
		//db
                var pg = require("pg");

                var conString = "postgres://postgres:mibesfat@localhost/openrpg";

                var client = new pg.Client(conString);
                client.connect();

                var query_string = "SELECT username, password FROM users where username = '" + this.mClientUsername + "';";

                const query = client.query(query_string);
		
	//	this.jesus('hey','now'); 
		//this.jesus(
		const results = [];		
                query.on('row', function(row)
                {
			results.push(row);
/*
                        serverUsername = row.username;
                        serverPassword = row.password;
                        if (clientUsername == serverUsername && clientPassword == serverPassword)
                        {
				loggedIn = true;
                        }
                        else
                        {
				loggedIn = false;
                        }
*/
                });
/*
		if (loggedIn == true)
		{
			console.log('got true');
			this.mLoggedIn = true;
			//return true;
		}
		else
		{
			console.log('got false');
			this.mLoggedIn = false;
			//return false;
		}
*/

		query.on('end', function(result) 
		{
			//done();			
			//console.log('r:' + JSON.stringify(results));
		});
		console.log('r:' + JSON.stringify(results));


        },
});

module.exports = GameClient;
