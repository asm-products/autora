var express = require('express');
var router = express.Router();
var path = require('path');
var s3 = require('s3');
var fs = require('fs');
var gm = require('gm').subClass({imageMagick: true});
var shortid = require('shortid');

exports.s3 = function (req, res, next) {
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
    var type = req.params.type;

    /*
    gm(file.path)
    .resize(400, 400)
    .noProfile()
    .write(file.path, function (err) {
    */
        var params = {
            localFile: file.path,

            s3Params: {
                Bucket: 'autora',
                Key: type + '/' + fileName
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
                filePath: 'https://s3-us-west-2.amazonaws.com/autora/' + type + '/' + fileName
            };

            return res.json(ret);
            console.log("done uploading");
        });
    /*});*/
};
