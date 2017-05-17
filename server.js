var http = require('http');

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

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

