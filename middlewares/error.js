let log4js = require('log4js');
let logger = log4js.getLogger();
let config = require('config');
let env = config.util.getEnv('NODE_ENV') || 'development';

module.exports = (err, req, res, next) => {
  let status = err.status;

  if (status === 404) {
    res.status(404);
    res.json({success: false, code: 404, err: 'Not Found', data: null});
  } else if (status === 400) {
    res.status(400);
    res.json({success: false, code: 400, err: err.message || null, data: null});
  } else {
    logger.error(err.errors || err.message);

    if (env !== 'production') { // Print stack message about error when env is development
      /* eslint-disable no-console */
      console.error(err.stack);
    }

    /* eslint-enable no-console */
    res.status(500);
    res.json({success: false, code: 500, err: err.message, data: null});
  }

  next();
};
