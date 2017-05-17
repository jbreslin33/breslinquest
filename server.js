var http = require('http');
var util = require('util');

var dl = require('./displaylogin');
var pl = require('./processlogin');

var mUsername = 0;
var mPassword = 0;

var express = require('express')
var app = express()

app.get('/login', function (req, res) {
        dl(res);
})

app.post('/login', function (req, res) {
        pl(req,res);
})

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

