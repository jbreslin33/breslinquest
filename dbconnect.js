#!/usr/bin/env node

var pg = require("pg");

var conString = "postgres://postgres:mibesfat@localhost/openrpg";


var client = new pg.Client(conString);
client.connect();

var query_string = "SELECT id, name FROM class ORDER BY name";


var query = client.query(query_string);
query.on("row", function (row, result) {
    result.addRow(row);
});
query.on("end", function (result) {
    console.log(JSON.stringify(result.rows, null, "    "));
    client.end();
});
