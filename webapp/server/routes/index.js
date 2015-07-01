var express = require('express');
var router = express.Router();
var app = express();

router.get('/', function(req, res, next) {
    if (app.get('env') === 'development') {
        res.sendfile('./webapp/client/dist/index.html');
    } else {
        res.sendfile('./webapp/client/dist/index.html');
    }
});

router.get('/assets/client.css', function(req, res, next) {
    res.sendfile('./webapp/client/dist/assets/client.css');
});

router.get('/assets/client.js', function(req, res, next) {
    res.sendfile('./webapp/client/dist/assets/client.js');
});

router.get('/assets/vendor.js', function(req, res, next) {
    res.sendfile('./webapp/client/dist/assets/vendor.js');
});

router.get('/assets/vendor.css', function(req, res, next) {
    res.sendfile('./webapp/client/dist/assets/vendor.css');
});

module.exports = router;
