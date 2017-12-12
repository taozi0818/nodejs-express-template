/**
 * Print request logs
 */

let log4js = require('log4js');
let config = require('config');

module.exports = log4js.connectLogger(
  log4js.getLogger(config.get('logger.name')),
  {
    level: 'INFO',
    format: ':method ":url" :status :res[Content-Length] :response-time'
  }
);
