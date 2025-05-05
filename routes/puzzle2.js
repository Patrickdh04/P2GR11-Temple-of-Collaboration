var express = require('express');
var router = express.Router();
const {shuffleArray} = require('./functions');

const ropeColor = ["Yellow", "Blue", "Green", "Orange", "Purple", "Red", "Cyan", "Black"];
const rules = ["First", "Striped", "Half white", "Wavy", "Distorted"];
const ruleToFolder ={
    "First": "solid",
    "Striped": "striped",
    "Half white": "half_white",
    "Wavy": "wavy",
    "Distorted": "distorted"
};
const allRopes = [];
shuffleArray(ropeColor);
shuffleArray(rules);
console.log(ropeColor);
console.log(rules);
let test = 0;

// Building rope objects
for (let i = 0; i < 5; i++){
    allRopes.push ({
        color: ropeColor[i], rule: rules[i], folder: ruleToFolder[rules[i]]
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

// Functions to analyse rope layout

function countColor(ropes, color){
    return ropes.filter(r => r.color === color).length;
}

function hasRule(ropes, rule) {
    return ropes.some(r => r.rule === rule);
}

function colourAt(ropes, index){
    return ropes[index]?.color
}

function ruleAt(ropes, index){
    return ropes[index]?.rule;
}

function buildClue(condition, action) {
    return `if ${condition}, pull the ${action}.`;
}

//Generating correct paragraph for manual

function buildCorrectParagraph(ropes){

    const clues =[];

    const redCount = countColor(ropes, "Red");
    const hasDistorted = hasRule(ropes, "Distorted");

    const secondColour = colourAt(ropes, 1);
    const thirdRule = ruleAt(ropes, 2);
    const fourthColour = colourAt(ropes, 3);
    const fifthRule = ruleAt(ropes, 4);

  
    let redCondition = "";
    if (redCount === 0) {
        redCondition = "there are no red ropes";
    } else if (redCount === 1) {
        redCondition = "there is exactly one red rope";
    } else if (redCount === 2) {
        redCondition = "there are exactly two red ropes";
    } else {
        redCondition = "there are more than two red ropes";
    }

      clues.push(buildClue(redCondition, "third rope"));
      clues.push(buildClue(`the second rope is ${secondColour.toLowerCase()}`,"the last rope"));
      clues.push(buildClue(`the third rope has the pattern ${thirdRule.toLowerCase()}`,"the second rope"));
      clues.push(buildClue(`the fourth rope is ${fourthColour.toLowerCase()}`,"the first rope"));
      clues.push(buildClue(`the fifth rope has the pattern ${fifthRule.toLowerCase()}`,"the sixth rope"));
      clues.push(buildClue(hasDistorted ? "at least one rope is distorted": "none of the ropes are distorted","the fourth rope"));
      
      return clues;
}

// helper function
function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}


// Generating 3 decoy paragraphs for manual

function buildDecoyParagraphs(ropes, count = 3) {
    const allColors = ["Red", "Blue", "Green", "Orange", "Purple", "Yellow", "Black", "Cyan"];
    const allRules = ["Distorted", "Half-white", "Solid", "Striped", "Wavy", "First"];
    const allPositions = ["first", "second", "third", "fourth", "fifth", "sixth"];
    const allActions = ["first rope", "second rope", "third rope", "fourth rope","fifth rope", "last rope", "the rope before the red one"];

    const paragraphs = [];

    for (let i = 0; i < count; i++) {
        const clues = [];

        // red condition
        const fakeRedCount = Math.floor(Math.random() * 5);
        let redCondition = "";
        if (fakeRedCount === 0) {
            redCondition = "there are no red ropes";
        } else if (fakeRedCount === 1) {
            redCondition = "there is exactly one red rope";
        } else if (fakeRedCount === 2) {
            redCondition = "there are exactly two red ropes";
        } else {
            redCondition = "there are more than two red ropes";
        }

        clues.push(buildClue(redCondition, getRandomElement(allActions)));

        // rest of the clues
        for (let j = 0; j < 4; j++) {
            const color = getRandomElement(allColors).toLowerCase();
            const rule = getRandomElement(allRules).toLowerCase();
            const position = getRandomElement(allPositions);
            const action = getRandomElement(allActions);

            if (Math.random() < 0.5) {
                clues.push(buildClue(`the ${position} rope is ${color}`, action));
            } else {
                clues.push(buildClue(`the ${position} rope has the pattern ${rule}`, action));
            }
        }

        // default clause at the end
        clues.push("Otherwise, pull the first rope.");

        paragraphs.push(clues);
    }

    return paragraphs;
}

      
router.get('/puz2_player1', function (req, res, next) {
    res.render('puz2_player1', {displayRopes, pullSequence, test});
});

router.get('/puz2_player2', function (req, res, next) {
    const correctParagraph = buildCorrectParagraph(displayRopes);
    const decoyParagraphs = buildDecoyParagraphs(displayRopes, 3);
    const ruleParagraphs = [correctParagraph, ...decoyParagraphs];
    shuffleArray(ruleParagraphs);

    res.render('puz2_player2', {ruleParagraphs});
});

module.exports = router;