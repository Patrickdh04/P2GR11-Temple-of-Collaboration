var express = require('express');
var router = express.Router();
const {shuffleArray} = require('./functions');

const ropeColor = ["Yellow", "Blue", "Green", "Orange", "Purple", "Red", "Cyan", "Black"];
const rules = ["First", "Striped", "Half white", "Not straight", "Longest"];
const allRopes = [];
shuffleArray(ropeColor);
shuffleArray(rules);
console.log(ropeColor);
console.log(rules);
let test = 0;

// Building rope objects
for (let i = 0; i < 5; i++){
    allRopes.push ({
        color: ropeColor[i], rule: rules[i]
    }) ;
}

//Cloned allRopes for display
const displayRopes = [...allRopes];


//Move the object with the property "First" to index 0 in displayRopes
let firstRopeIndex = displayRopes.findIndex(rope => rope.rule === "First");
if (0 !== firstRopeIndex) {
    displayRopes.unshift(displayRopes.splice(firstRopeIndex, 1)[0]);
}

// The sequence in which the ropes should be clicked/pulled

const pullSequence = displayRopes.map((_, i) => i);
shuffleArray(pullSequence);

console.log(displayRopes);


router.get('/puz2_player1', function (req, res, next) {
    res.render('puz2_player1', {displayRopes, pullSequence, test});
});

router.get('/puz2_player2', function (req, res, next) {
    res.render('puz2_player2', {});
});

module.exports = router;