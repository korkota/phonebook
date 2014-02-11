var winston = require('winston');

var getLogger = function(module) {
  var path = module.filename.split('/').slice(-2).join('/');

  var logger = new winston.Logger({
    transports : [
      new winston.transports.Console({
        colorize: true,
        level: 'debug',
        label: path
      })
    ]
  });

  return logger;
};

module.exports = getLogger;