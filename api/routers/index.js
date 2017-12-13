let router = require('express').Router();

router.get('/demos', Controllers.Demo.test);

module.exports = router;
