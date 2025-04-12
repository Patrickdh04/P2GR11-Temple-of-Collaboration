var express = require('express');
var router = express.Router();
const {shuffleArray} = require('./functions');

const ropeColor = ["Yellow", "Blue", "Green", "Orange", "Purple", "Red", "Cyan", "Black"];
const rules = ["First", "Striped", "Half white", "Not straight", "Longest"];
const ropes = [5];
shuffleArray(ropeColor);
console.log(ropeColor);
console.log(rules);

for (let i = 0; i < 5; i++){
    ropes.push ({
        color: ropeColor[i], rule: rules[i]
    }) ;
}

console.log(ropes[1]);



router.get('/puz2_player1', function (req, res, next) {
    res.render('puz2_player1');
});
module.exports = router;