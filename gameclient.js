var fs = require('fs');

//my exports
var application = require('./application');

var gameClient = function(socketid,clientUsername,clientPassword)
{
	this.mSocketID = socketid;
	this.mUserID = 0;
	this.mClientUsername = clientUsername;
	this.mClientPassword = clientPassword;
	this.mServerUsername = 0;
	this.mServerPassword = 0;
	
	this.mLoggedIn = false;

	checkLogin(this.mClientUsername,this.mClientPassword);
};

var checkLogin = function(client_username,client_password)
{
        //db
        var pg = require("pg");

        var conString = "postgres://postgres:mibesfat@localhost/openrpg";

        var client = new pg.Client(conString);
        client.connect();

        var query_string = "SELECT username, password FROM users where username = '" + this.mClientUsername + "';";

        var query = client.query(query_string);
        query.on("row", function (row)
        {
        	serverUsername = row.username;
                serverPassword = row.password;
                console.log('clientUsername:' + client_username + ' clientPassword:' + client_password + ' serverUsername:' + serverUsername + ' serverPassword:' + serverPassword);
                if (client_username == serverUsername && client_password == serverPassword)
                {
                	//we are authenticated
			console.log('login successful');	

                        fs.readFile('simple.html', function (err, data)
                       	{
                        	res.writeHead(200,
                                {
                                        'Content-Type': 'text/html',
                                       	'Content-Length': data.length
                                });
                                res.write(data);
                                res.end();
                        });

                }
		else
		{
			console.log('login failed');	
		}
		application.printLog('from gameclient');
	});
}

module.exports = gameClient;

