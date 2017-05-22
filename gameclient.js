var gameClient = function(socketid,clientUsername,clientPassword)
{
	console.log('cons:' + clientUsername);
	this.mSocketID = socketid;
	this.mUserID = 0;
	this.mClientUsername = clientUsername;
	this.mClientPassword = clientPassword;
	this.mServerUsername = 0;
	this.mServerPassword = 0;
	
	this.mLoggedIn = false;

	var getClientUsername = function()
	{
		return this.mClientUsername;
	}

	var checkLogin = function(client_username,client_password)
	{
		console.log('cu:' + client_username);
		console.log('cp:' + client_password);
        	//db
        	var pg = require("pg");

        	var conString = "postgres://postgres:mibesfat@localhost/openrpg";

        	var client = new pg.Client(conString);
        	client.connect();

        	var query_string = "SELECT username, password FROM users where username = '" + client_username + "';";

        	var query = client.query(query_string);
        	query.on("row", function (row)
        	{
        		serverUsername = row.username;
                	serverPassword = row.password;
                	if (client_username == serverUsername && client_password == serverPassword)
                	{
				mLoggedIn = true;
                	}
			else
			{
				mLoggedIn = false;
			}
		});
	}
	checkLogin(clientUsername,clientPassword);
};

module.exports = gameClient;

