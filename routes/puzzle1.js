const express = require('express');
const router = express.Router();
const {shuffleArray} = require('./functions');

//Unit tests for shuffleArray()
const assert = require('assert');
const originalArray = [1,2,3,4,5,6];
const shuffledArray = shuffleArray([...originalArray]);
//We make sure the length is the same as the input
assert.strictEqual(originalArray.length, shuffledArray.length, "Length of the shuffled array does not match");
//We make sure the outputted array has the same elements as the input
assert.deepStrictEqual([...originalArray].sort(), [...shuffledArray].sort(), "Elements of shuffled array does not match");
//Normally you would test if the output matches the expected output, however
//as this is a function which has a random output that can potentially match the input
//we cannot compare anything to the exact output
//We can check the output of an array with one element
assert.deepStrictEqual([1], shuffleArray([1]), "Output of shuffled array does not match")


let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let code_alphabet = ['𓀃', '𓋬', '𓀭', '𓉷', '𓀒', '𓀸', '𓁖', '𓏞', '𓅾', '𓃂', '𓂯', '𓉩',
    '𓀼', '𓃩', '𓅷', '𓁲', '𓄰', '𓈣', 'ඞ', '𓂻', '𓅒', '𓂙', '𓁿', '𓈝', '𓆦', '𓋣'];

shuffleArray(code_alphabet);
let [code_norm, code_symbol] = randomiseCode(alphabet, code_alphabet);
console.log("Code norm: " + code_norm + " Code symbol: " + code_symbol);

function randomiseCode(alphabet, code_alphabet) {
    let temp_alphabet = alphabet.slice();
    let temp_code_alphabet = code_alphabet.slice();
    const code_length = 5;
    let code_norm = "";
    let code_symbol = [];

    for (let i = 0; i < code_length; i++) {
        let character = Math.floor(Math.random() * temp_alphabet.length);
        code_norm += temp_alphabet[character];
        code_symbol.push(temp_code_alphabet[character]);
        temp_code_alphabet.splice(character, 1);
        temp_alphabet.splice(character, 1);
    }
    return [code_norm, code_symbol];
}
let wrongPassword = null;
router.get('/puz1_player1', function (req, res, next) {
    res.render('puz1_player1', {code_symbol, wrongPassword});
});

router.post('/puz1_player1', function (req, res, next) {
    console.log(req.body.codeGuess);
    if (wrongPassword === false){
        res.redirect("../puzzle2/puz2_player1");
    }
    else if (req.body.codeGuess.toUpperCase() === code_norm) {
        wrongPassword = false;
        res.render('puz1_player1', {code_symbol, prevGuess: req.body.codeGuess, wrongPassword});

    } else {
        console.log('Wrong code');
        wrongPassword = true;
        res.render('puz1_player1', {code_symbol, prevGuess: req.body.codeGuess, wrongPassword});
    }
});

router.get('/puz1_player2', function (req, res, next) {
    res.render('puz1_player2', {alphabet, code_alphabet, wrongPassword});
});

router.post('/puz1_player2', function (req, res, next) {
    res.redirect('../puzzle2/puz2_player2');
});

module.exports = router;