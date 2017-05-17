var http = require('http');
var fs = require('fs');
var formidable = require("formidable");
var util = require('util');

var mUsername = 0;
var mPassword = 0;

var express = require('express')
var app = express()

app.get('/login', function (req, res) {
        displayLogin(res);
})

app.post('/login', function (req, res) {
        processAllFieldsOfTheForm(req, res);
})

function displayLogin(res) {
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

