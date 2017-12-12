let _ = require('lodash');

module.exports = function (req, res, next) {

  res.fail = function (msg) {

    if (!_.isError(msg)) {

      res.status(400);
      res.json({success: false, code: 400, msg: msg ? msg : null, data: null});
    } else {

      res.status(500);
      res.json({success: false, code: 500, msg: msg.message, data: null});
    }
  };

  next();
};
