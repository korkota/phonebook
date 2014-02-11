var app = require('./lib/app.js');
var config = require('./config');
var log = require('./lib/log')(module);

app.listen(config.get('application:port'), function() {
  log.info('Express server listening on port ' + config.get('application:port'));
});

process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
});