var database = require('../lib/database');
var log = require('../lib/log')(module);
var Subscriber = database.Subscriber;
var ObjectId = database.mongoose.Types.ObjectId;


/**
 * @namespace
 */
var api = {};


/**
 * @namespace
 */
api.subscriber = {};

api.subscriber.create = function(req, res) {
  var params = {
    name: req.param('name'),
    phoneNumber: req.param('phoneNumber')
  };

  var newSubscriber = Subscriber(params);

  newSubscriber.save(function (err, product) {
    if (err) {
      res.send(500);
      log.error(err);
    }

    res.json(product, 200);
  });
};


api.subscriber.read = function(req, res) {
  var id = ObjectId(req.param('id'));

  Subscriber.findById(id, function (err, doc) {
    if (err) {
      res.send(500);
      log.error(err);
    }

    if (!doc) {
      res.send(404);
    }

    res.json(doc, 200);
  });
};

api.subscriber.update = function(req, res) {
  var id = ObjectId(req.param('id'));

  var params = {
    name: req.param('name'),
    phoneNumber: req.param('phoneNumber')
  };

  Subscriber.findByIdAndUpdate(id, params, function (err, doc) {
    if (err) {
      res.send(500);
      log.error(err);
    }

    if (!doc) {
      res.send(404);
    }

    res.json(doc, 200);
  });
};

api.subscriber.delete = function(req, res) {
  var id = ObjectId(req.param('id'));

  Subscriber.findByIdAndRemove(id, function (err, doc) {
    if (err) {
      res.send(500);
      log.error(err);
    }

    if (!doc) {
      res.send(404);
    }

    res.json(doc, 200);
  });
};


/**
 * @namespace
 */
api.subscribers = {};

api.subscribers.read = function(req, res) {
  Subscriber.find({}, function (err, docs) {
    if (err) {
      res.send(500);
      log.error(err);
    }

    if (docs.length === 0) {
      res.send(404);
    }

    res.json(docs, 200);
  });
};

api.subscribers.delete = function(req, res) {
  Subscriber.remove({}, function (err) {
    if (err) {
      res.send(500);
      log.error(err);
    }

    res.send(200);
  });
};


module.exports = api;
