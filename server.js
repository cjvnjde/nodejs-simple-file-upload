var express = require('express');
var multer  = require('multer');
var cors  = require('cors');
var parser  = require('body-parser');
var session  = require('express-session');
var fs  = require('fs');

var app = express();
app.use(cors())

app.use(parser.json())
app.use(session({ secret: 'some secrety secret' }))

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        const dir = './uploads';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        callback(null, dir);
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

var upload = multer({storage: storage}).array('files', 12);
app.post('/upload', function (req, res, next) {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Something went wrong:(");
        }
        res.end(JSON.stringify({ status: 'ok' }));
    });
})

app.listen(3001);
