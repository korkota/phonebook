var mongoose = require('mongoose');
var config = require('../config');
var log = require('./log')(module);

mongoose.connect(config.get('database:uri'));

var db = mongoose.connection;

db.on('error', function (err) {
  log.error('Connection error:', err.message);
});

db.once('open', function callback () {
  log.info('Connected to DB!');
});

var Schema = mongoose.Schema;

var SubscriberSchema = new Schema({
  name: { type: String, required: true, trim: true},
  phoneNumber: { type: String, trim: true }
});

var Subscriber = mongoose.model('Subscriber', SubscriberSchema);

module.exports.mongoose = mongoose;
module.exports.Subscriber = Subscriber;