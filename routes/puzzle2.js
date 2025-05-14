var express = require('express');
var router = express.Router();
const {shuffleArray} = require('./functions');

const ropeColour = ["Yellow", "Blue", "Green", "Orange", "Purple", "Red", "Cyan", "Black"];
const rules = ["First", "Striped", "Half white", "Wavy", "Distorted"];
const ruleToFolder ={
    "First": "solid",
    "Striped": "striped",
    "Half white": "half_white",
    "Wavy": "wavy",
    "Distorted": "distorted"
};
const allRopes = [];
shuffleArray(ropeColour);
shuffleArray(rules);
/*console.log(ropeColour);
console.log(rules);
const test = 0; */

// Building rope objects
for (let i = 0; i < 5; i++){
    allRopes.push ({
        colour: ropeColour[i], rule: rules[i], folder: ruleToFolder[rules[i]]
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
console.log (pullSequence)

buildCorrectParagraph(displayRopes, pullSequence);


// Generating correct paragraph
function buildCorrectParagraph(displayRopes, pullSequence) {
    const tempClues = [];
    
    for (let i = 0; i < pullSequence.length; i++) {
        const ropeIndex = pullSequence[i];
        const rope = displayRopes[ropeIndex];

        tempClues.push(`The ${ordinal(i + 1)} rope to pull is the ${rope.rule.toLowerCase()} ${rope.colour.toLowerCase()} rope.`);
    }

    const clues = [5]

    for (let index = 0; index < pullSequence.length; index++) {
        clues[index] = tempClues[pullSequence[index]]
    }

    return clues;
    console.log(clues);

    // Helper to convert 1 to 1st etc.
    function ordinal(n) {
        const suffixes = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
    }}

// helper function
function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function buildClue(condition, action) {
    return `if ${condition}, pull the ${action}.`;}

// Generating 3 decoy paragraphs for manual

function buildDecoyParagraphs(ropes, count = 3) {
    const allColours = ["Red", "Pink", "Silver", "Brass", "Bronze", "Gold", "White", "Clear"];
    const allRules = ["Straight", "Half-brown", "Solid", "Polkadotted", "Zig-zagged", "Second"];
    const allPositions = ["first", "second", "third", "fourth", "fifth", "sixth"];
    const allActions = ["1st rope", "2nd rope", "3rd rope", "4th rope","5th rope", "last rope", "the rope before the last one"];

    const paragraphs = [];

    for (let i = 0; i < count; i++) {
        const clues = [];

        // rest of the clues
        for (let j = 0; j < 4; j++) {
            const colour = getRandomElement(allColours).toLowerCase();
            const rule = getRandomElement(allRules).toLowerCase();
            const position = getRandomElement(allPositions);
            const action = getRandomElement(allActions);

            if (Math.random() < 0.5) {
                clues.push(buildClue(`the ${position} rope is ${colour}`, action));
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
    res.render('puz2_player1', {displayRopes, pullSequence});
});

router.get('/puz2_player2', function (req, res, next) {
    const correctParagraph = buildCorrectParagraph(displayRopes, pullSequence);
    const decoyParagraphs = buildDecoyParagraphs(displayRopes, 3);
    const ruleParagraphs = [correctParagraph, ...decoyParagraphs];
    shuffleArray(ruleParagraphs);

    console.log("ruleParagraphs:", ruleParagraphs);

    res.render('puz2_player2', {ruleParagraphs});
});

module.exports = router;