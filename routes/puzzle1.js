var express = require('express');
var router = express.Router();

let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let code_alphabet = ['𓀃', '𓋬', '𓀭', '𓉷', '𓀒', '𓀸', '𓁖', '𓏞', '𓅾', '𓃂', '𓂯', '𓉩',
    '𓀼', '𓃩', '𓅷', '𓁲', '𓄰', '𓈣', 'ඞ', '𓂻', '𓅒', '𓂙', '𓁿', '𓈝', '𓆦', '𓋣'];

code_alphabet = randomiseCodeAlphabet(code_alphabet);
//[code_norm, code_symbol] = randomiseCode(alphabet, code_alphabet);

function randomiseCodeAlphabet(code_alphabet){
    for (let i = 0; i < code_alphabet.length; i++){
        const j = Math.floor(Math.random() * i + 1);
        [code_alphabet[i], code_alphabet[j]] = [code_alphabet[j], code_alphabet[i]];
    }
    console.log(code_alphabet);
    return code_alphabet;
}

//function randomiseCode



router.get('/puz1_player1', function (req, res, next) {
    res.render('puz1_player1');
});

const rightCode = "banana";
router.post('/puz1_player1', function (req, res, next) {
    console.log(req.body.codeGuess);
    if (req.body.codeGuess == rightCode) {
        res.redirect("/puzzle1/puz1_congrats");
    } else {
        console.log("Wrong code");
        res.render("puz1_player1", {prevGuess: req.body.codeGuess});
    }
});

router.get('/puz1_congrats', function (req, res, next) {
    res.render('puz1_congrats');
});

router.get('/puz1_player2', function (req, res, next) {
    res.render('puz1_player2', {norm: alphabet, code: code_alphabet});
});

module.exports = router;