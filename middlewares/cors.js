/**
 * This middleware is for CORS.
 */

module.exports = (req, res, next) => {
  res.header({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE',
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type,Token',
    'Access-Control-Allow-Credentials': 'true'
  });
  next();
};
