var fs = require('fs');

var formidable = require("formidable");
var util = require('util');
var gc = require('./gameclient');
	
var clientUsername = 0;
var clientPassword = 0;

var serverUsername = 0;
console.log('seeting serverUsername to 0');
var serverPassword = 0;

var processLogin = function(req,res,application)
{
	
	var form = new formidable.IncomingForm();

	form.on('field', function(field, value) 
	{
        	if (field == 'username')
        	{
			clientUsername = value;
		}
        	if (field == 'password')
        	{
                	clientPassword = value;
        	}
	});
    	form.parse(req, function (err, fields, files) 
	{
		//db
		var pg = require("pg");

		var conString = "postgres://postgres:mibesfat@localhost/openrpg";

		var client = new pg.Client(conString);
		client.connect();

		var query_string = "SELECT username, password FROM users where username = '" + clientUsername + "';";

		var query = client.query(query_string);
		query.on("row", function (row) 
		{
			serverUsername = row.username; 
			serverPassword = row.password; 
			console.log('clientUsername:' + clientUsername + ' clientPassword:' + clientPassword + ' serverUsername:' + serverUsername + ' serverPassword:' + serverPassword); 
			if (clientUsername == serverUsername && clientPassword == serverPassword)
			{
				//we are authenticated
				//application.mGameClientsArray.push(gc(serverUsername,serverPassword,clientUsername,clientPassword)); 
				
	
			}
		});
		query.on("row", function (row, result) 
		{
    			result.addRow(row);
		});
		query.on("end", function (result) 
		{
			//console.log(JSON.stringify(result.rows, null, "    "));
    			client.end();
		});


 		fs.readFile('index.html', function (err, data) 
		{
        		res.writeHead(200, 
			{
            			'Content-Type': 'text/html',
                		'Content-Length': data.length
        		});
        		res.write(data);
        		res.end();
    		});
    	});
};

module.exports = processLogin;
