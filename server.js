var http = require('http');
var fs = require('fs');
var formidable = require("formidable");
var util = require('util');

var mUsername = 0;
var mPassword = 0;
console.log('running:');


//begin express
var express = require('express')
var app = express()

app.get('/', function (req, res) {
  //res.send('Hello World!')
        displayForm(res);

})

app.post('/', function (req, res) {
  //res.send('Hello World!')
        //displayForm(res);
        processAllFieldsOfTheForm(req, res);

})


//end express


/*
var server = http.createServer(function (req, res) {
    if (req.method.toLowerCase() == 'get') {
        displayForm(res);
    } else if (req.method.toLowerCase() == 'post') {
        processAllFieldsOfTheForm(req, res);
    }
});
*/

function displayForm(res) {
    fs.readFile('form.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
                'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });
}

function processAllFieldsOfTheForm(req, res) {
    var form = new formidable.IncomingForm();

form.on('field', function(field, value) {
	if (field == 'username')
	{
		mUsername = value;
		console.log('mUsername:' + mUsername);
		dbcall();
	}
	if (field == 'password')
	{
		mPassword = value;
		console.log('mPassword:' + mPassword);
	}
});

    form.parse(req, function (err, fields, files) {

	//mUsername = fields.username; 
        //Store the data from the fields in your data store.
        //The data store could be a file or database or any other store based
        //on your application.
        res.writeHead(200, {
            'content-type': 'text/plain'
        });
        res.write('received the data:\n\n');
        res.end(util.inspect({
            fields: fields,
            files: files
        }));
    });
}


//db
function dbcall() {
var pg = require("pg");

var conString = "postgres://postgres:mibesfat@localhost/openrpg";

var client = new pg.Client(conString);
client.connect();

//var query_string = "SELECT id, name FROM class ORDER BY name";
var query_string = "SELECT username, password FROM users where username = '" + mUsername + "';"; 
console.log('query_string:' + query_string);


var query = client.query(query_string);
query.on("row", function (row, result) {
    result.addRow(row);
});
query.on("end", function (result) {
    console.log(JSON.stringify(result.rows, null, "    "));
    client.end();
});

}

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

//server.listen(3000);
//console.log("server listening on 3000");
