const express = require('express');
const router = express.Router();
const {shuffleArray} = require('./functions');

let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let code_alphabet = ['𓀃', '𓋬', '𓀭', '𓉷', '𓀒', '𓀸', '𓁖', '𓏞', '𓅾', '𓃂', '𓂯', '𓉩',
    '𓀼', '𓃩', '𓅷', '𓁲', '𓄰', '𓈣', 'ඞ', '𓂻', '𓅒', '𓂙', '𓁿', '𓈝', '𓆦', '𓋣'];

code_alphabet = shuffleArray(code_alphabet);
let [code_norm, code_symbol] = randomiseCode(alphabet, code_alphabet);
console.log("Code norm: " + code_norm + " Code symbol: " + code_symbol);

function randomiseCode(alphabet, code_alphabet) {
    const code_length = 5;
    let code_norm = "";
    let code_symbol = [];
    for (let i = 0; i < code_length; i++) {
        let character = Math.floor(Math.random() * alphabet.length);
        code_norm += alphabet[character];
        code_symbol.push (code_alphabet[character]);
    }
    return [code_norm, code_symbol];
}
let wrongPassword = false;
router.get('/puz1_player1', function (req, res, next) {
    res.render('puz1_player1', {code_symbol: code_symbol, wrongPassword: wrongPassword});
});

router.post('/puz1_player1', function (req, res, next) {
    console.log(req.body.codeGuess);
    if (req.body.codeGuess.toUpperCase() === code_norm) {
        res.redirect("/puzzle1/puz1_congrats");
    } else {
        console.log('Wrong code');
        wrongPassword = true;
        res.render('puz1_player1', {code_symbol: code_symbol, prevGuess: req.body.codeGuess, wrongPassword: wrongPassword});
    }
});

router.get('/puz1_congrats', function (req, res, next) {
    res.render('puz1_congrats');
});

router.get('/puz1_player2', function (req, res, next) {
    res.render('puz1_player2', {norm: alphabet, code: code_alphabet});
});

module.exports = router;