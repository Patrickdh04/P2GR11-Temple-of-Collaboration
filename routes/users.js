var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/player1', function(req, res, next) {
  res.render('player1');
});

router.get('/player2', function(req, res, next) {
  res.render('player2');
});

module.exports = router;
