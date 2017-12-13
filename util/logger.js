/**
 * Simple logs tool replace console.log()
 */

let log4js = require('log4js');

module.exports = (title) => {
  return log4js.getLogger(title);
};
