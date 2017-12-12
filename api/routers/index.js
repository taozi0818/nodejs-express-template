let router = require('express').Router();

router.get('/', (req, res, next) => {
  return res.success();
});

module.exports = router;
