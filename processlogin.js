var formidable = require("formidable");
var util = require('util');


var processLogin = function(req,res)
{
	var form = new formidable.IncomingForm();

	form.on('field', function(field, value) 
	{
        	if (field == 'username')
        	{
                	mUsername = value;
			var pg = require("pg");

			var conString = "postgres://postgres:mibesfat@localhost/openrpg";

			var client = new pg.Client(conString);
			client.connect();

			var query_string = "SELECT username, password FROM users where username = '" + mUsername + "';";
			console.log('query_string:' + query_string);

			var query = client.query(query_string);
			query.on("row", function (row, result) 
			{
    				result.addRow(row);
			});
			query.on("end", function (result) 
			{
    				console.log(JSON.stringify(result.rows, null, "    "));
    				client.end();
			});

        	}
        	if (field == 'password')
        	{
                	mPassword = value;
                	console.log('mPassword:' + mPassword);
        	}
});

    form.parse(req, function (err, fields, files) {
        res.writeHead(200, {
            'content-type': 'text/plain'
        });
        res.write('received the data:\n\n');
        res.end(util.inspect({
            fields: fields,
            files: files
        }));
    });



};

module.exports = processLogin;

