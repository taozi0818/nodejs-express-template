/**
 * For parsering xml body
 */

let parseString = require('xml2js').parseString;

module.exports = (req, res, next) => {
  let contentType = req.headers['content-type'] || 'application/json';

  if (contentType.indexOf('xml') !== -1) {
    let buf = '';

    req.on('data', (chunk) => {
      buf += chunk;
    });

    req.on('end', () => {
      parseString(buf, (err, json) => {
        if (err) {
          next(err);
        } else {
          req.body = json;
          next();
        }
      });
    });
  } else {
    next();
  }
};
