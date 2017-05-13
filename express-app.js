var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser')
app.use(express.bodyParser());

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/start-page.html'));
});
/*
app.post('/', function(req, res) {
    res.send('Username: ' + req.body.username);
)};
*/
console.log('Username: ' + req.body.username);
console.log('Password: ' + req.body.password);

app.listen(3000);
