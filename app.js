
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var api = require('./routes/api');
var http = require('http');
var path = require('path');
var config = require('./config');
var log = require('./lib/log')(module);

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'client/app')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/**
 *
 */
app.post('/api/subscribers', api.subscriber.create);
app.get('/api/subscribers/:id([a-fA-f0-9]{24})', api.subscriber.read);
app.put('/api/subscribers/:id([a-fA-f0-9]{24})', api.subscriber.update);
app.delete('/api/subscribers/:id([a-fA-f0-9]{24})', api.subscriber.delete);


/**
 *
 */
app.get('/api/subscribers', api.subscribers.read);
app.delete('/api/subscribers', api.subscribers.delete);


http.createServer(app).listen(config.get('application:port'), function() {
  log.info('Express server listening on port ' + config.get('application:port'));
});
