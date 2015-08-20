var express = require('express');
var router = express.Router();
var app = express();
var path = require('path');
var s3 = require('s3');
var fs = require('fs');
var multipart = require('connect-multiparty');
var shortid = require('shortid');

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

router.post('/s3/upload', multipart(), function (req, res, next) {
    var file = req.files.file;
    var client = s3.createClient({
        maxAsyncS3: 20,     // this is the default
        s3RetryCount: 3,    // this is the default
        s3RetryDelay: 1000, // this is the default
        multipartUploadThreshold: 20971520, // this is the default (20 MB)
        multipartUploadSize: 15728640, // this is the default (15 MB)
        s3Options: {
            accessKeyId: 'AKIAJ3RM2VE37FA2SHGQ',
            secretAccessKey: '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'
        },
    });

    var ext = file.name.split('.').pop();

    var fileName = shortid.generate() + '.' + ext;

    var params = {
        localFile: file.path,

        s3Params: {
            Bucket: 'autora',
            Key: 'project/' + fileName
        },
    };

    var uploader = client.uploadFile(params);

    uploader.on('error', function(err) {
        return res.json({success: false});
        console.error("unable to upload:", err.stack);
    });

    uploader.on('progress', function() {
        console.log("progress", uploader.progressMd5Amount,
                uploader.progressAmount, uploader.progressTotal);
    });

    uploader.on('end', function() {
        var ret = {
            success: true,
            filePath: 'https://s3-us-west-2.amazonaws.com/autora/project/' + fileName
        };

        return res.json(ret);
        console.log("done uploading");
    });
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
