var http = require('http');
var path = require('path');

var express = require('express');

var api = require('./../routes/api');

var app = express();

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, '../client/app')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.post('/api/subscribers', api.subscriber.create);
app.get('/api/subscribers/:id([a-fA-f0-9]{24})', api.subscriber.read);
app.put('/api/subscribers/:id([a-fA-f0-9]{24})', api.subscriber.update);
app.delete('/api/subscribers/:id([a-fA-f0-9]{24})', api.subscriber.delete);

app.get('/api/subscribers', api.subscribers.read);
app.delete('/api/subscribers', api.subscribers.delete);


module.exports = http.createServer(app);
