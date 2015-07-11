var express = require('express');
var router = express.Router();
var Subscriber = require('../models/subscriber');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Autora | Writing just got collective.' });
});

/*
router.get('/subscribers', function(req, res, next) {
    Subscriber.find(function (err, subscribers) {
        res.render('subscribers', { subscribers: subscribers });
    });
});
*/

router.post('/api/subscribe', function(req, res) {
    var subscriberEmail = req.body.email,
        newSubscriber = new Subscriber({
            email: subscriberEmail
        });

    // save the user
    newSubscriber.save(function(err) {
        if (err) throw err;

        res.send('1');
    });

    // sending email
    var mandrill = require('node-mandrill')('ngTQoAll5AS5JYR5daT50Q');

    res.render('welcome-email', {}, function(err, html) {

        mandrill('/messages/send', {
            message: {
                to: [{email: subscriberEmail, name: 'Subscriber'}],
                from_email: 'autora@autora.ink',
                subject: "Welcome to Autora!",
                html: html
            }
        }, function(error, response) {
            console.log(error);
        });

    });
});

module.exports = router;
