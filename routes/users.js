var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

var char = '𓅗';
console.log(char);
router.get('/player1', function(req, res, next) {
  res.render('player1');
});

router.get('/congrats', function(req, res, next) {
  res.render('congrats');
});

const rightCode = "banana";
router.post('/player1', function(req, res, next) {
  console.log(req.body.codeGuess);
  if(req.body.codeGuess == rightCode){
    res.redirect("/users/congrats");
  }
  else{
    console.log("Wrong code");
    res.render("player1", { prevGuess: req.body.codeGuess });
  }


});

router.get('/player2', function(req, res, next) {
  res.render('player2');
});

module.exports = router;
