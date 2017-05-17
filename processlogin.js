var formidable = require("formidable");

var processLogin = function(req,res)
{
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



};

module.exports = processLogin;

