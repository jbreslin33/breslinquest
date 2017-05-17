
var fs = require('fs');
var displayLogin = function(res)
{
 fs.readFile('form.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
                'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });

}; 

module.exports = displayLogin;
