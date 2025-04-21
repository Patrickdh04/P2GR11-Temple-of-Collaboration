var express = require('express');
var router = express.Router();
const {shuffleArray} = require('./functions');

const ropeColor = ["Yellow", "Blue", "Green", "Orange", "Purple", "Red", "Cyan", "Black"];
const rules = ["First", "Striped", "Half white", "Not straight", "Longest"];
const ropes = [];
shuffleArray(ropeColor);
shuffleArray(rules);
console.log(ropeColor);
console.log(rules);

for (let i = 0; i < 5; i++){
    ropes.push ({
        color: ropeColor[i], rule: rules[i]
    }) ;
}
//console.log(ropes); For testing unshift

//Move the object with the property "First" to index 0
let firstRopeIndex = ropes.findIndex(rope => rope.rule === "First");
if (0 !== firstRopeIndex) {
    ropes.unshift(ropes.splice(firstRopeIndex, 1)[0]);
}

console.log(ropes);


router.get('/puz2_player1', function (req, res, next) {
    res.render('puz2_player1', {ropes});
});

router.get('/puz2_player2', function (req, res, next) {
    res.render('puz2_player2', {ropes});
});

module.exports = router;