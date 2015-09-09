var express = require('express');
var router = express.Router();
var app = express();
var path = require('path');
var multipart = require('connect-multiparty');

router.get('/assets/*', function(req, res, next) {
    res.sendfile('./webapp/client/dist'+req.path);
});

router.get('/images/*', function(req, res, next) {
    res.sendfile('./webapp/client/dist'+req.path);
});

router.get('/fonts/*', function(req, res, next) {
    res.sendfile('./webapp/client/dist'+req.path);
});

router.get('/*', function(req, res, next) {
    res.sendfile('./webapp/client/dist/index.html');
});

router.get('/*', function(req, res, next) {
    res.sendfile('./webapp/client/dist/index.html');
});

router.post('/upload/s3/:type', multipart(), require('./upload').s3);

module.exports = router;
