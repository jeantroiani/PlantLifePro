var express = require('express');
var router = express.Router();

/* GET data. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST data. */
router.post('/', function(req, res, next) {
  res.send('post resource');
});

module.exports = router;
