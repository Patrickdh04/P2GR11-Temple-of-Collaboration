var express = require('express');
var router = express.Router();

router.get('/puz1_player1', function(req, res, next) {
    res.render('puz1_player1');
});

var char = '𓅗';
console.log(char);

router.get('/puz1_congrats', function(req, res, next) {
    res.render('puz1_congrats');
});

const rightCode = "banana";
router.post('/puz1_player1', function(req, res, next) {
    console.log(req.body.codeGuess);
    if(req.body.codeGuess == rightCode){
        res.redirect("/puzzle1/puz1_congrats");
    }
    else{
        console.log("Wrong code");
        res.render("puz1_player1", { prevGuess: req.body.codeGuess });
    }
});

router.get('/puz1_player2', function(req, res, next) {
    res.render('puz1_player2');
});

module.exports = router;