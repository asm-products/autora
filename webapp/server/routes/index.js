var express = require('express');
var router = express.Router();
var app = express();
var path = require('path');

router.get('/assets/*', function(req, res, next) {
    res.sendfile('./webapp/client/dist'+req.path);
});

router.get('/images/*', function(req, res, next) {
    res.sendfile('./webapp/client/dist'+req.path);
});

router.get('/*', function(req, res, next) {
    res.sendfile('./webapp/client/dist/index.html');
});


// router.get('/assets/client.js', function(req, res, next) {
//     res.sendfile('./webapp/client/dist/assets/client.js');
// });

// router.get('/assets/vendor.js', function(req, res, next) {
//     res.sendfile('./webapp/client/dist/assets/vendor.js');
// });

// router.get('/assets/vendor.css', function(req, res, next) {
//     res.sendfile('./webapp/client/dist/assets/vendor.css');
// });

module.exports = router;
