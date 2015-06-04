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
    var newSubscriber = new Subscriber({
        email: req.body.email
    });

    // save the user
    newSubscriber.save(function(err) {
        if (err) throw err;

        res.send('1');
    });
});

module.exports = router;
