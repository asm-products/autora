// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var subscriberSchema = new Schema({
  email: String,
  created_at: Date
});

// on every save, add the date
subscriberSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
    this.created_at = currentDate;

    next();
});

// the schema is useless so far
// we need to create a model using it
var Subscriber = mongoose.model('Subscriber', subscriberSchema);

// make this available to our users in our Node applications
module.exports = Subscriber;
