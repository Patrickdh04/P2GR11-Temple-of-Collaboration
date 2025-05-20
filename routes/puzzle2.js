var express = require('express');
var router = express.Router();
const {shuffleArray} = require('./functions');

const ropeColour = ["Yellow", "Blue", "Green", "Orange", "Purple", "Red", "Cyan", "Black"];
const rules = ["Solid", "Striped", "Half white", "Wavy", "Distorted"];
const ruleToFolder = {
    "Solid": "solid",
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
for (let i = 0; i < 5; i++) {
    allRopes.push({
        colour: ropeColour[i], rule: rules[i], folder: ruleToFolder[rules[i]]
    });
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
console.log(pullSequence)

buildCorrectParagraph(displayRopes, pullSequence);


// Generating correct paragraph
function buildCorrectParagraph(displayRopes, pullSequence) {
    const clues = [];

    for (let i = 0; i < pullSequence.length; i++) {
        const pullOrder = pullSequence[i];
        const rope = displayRopes[i];

        clues[pullOrder] = `The ${ordinal(pullOrder + 1)} rope to pull is the ${rope.rule.toLowerCase()} ${rope.colour.toLowerCase()} rope.`;
    }

    return clues;

    function ordinal(n) {
        const suffixes = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
    }
}


// helper function
function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function buildClue(condition, action) {
    return `The ${condition} rope to pull is the ${action}.`;
}

// Generating 3 decoy paragraphs for manual

function buildDecoyParagraphs(ropes, count = 3) {
    const allColours = ["Red", "Pink", "Silver", "Brass", "Bronze", "Gold", "White", "Clear"];
    const allRules = ["Straight", "Half-brown", "Solid", "Polkadotted", "Zig-zagged", "Second"];

    const paragraphs = [];

    for (let i = 0; i < count; i++) {
        const clues = [];

        for (let j = 0; j < 5; j++) {
            const colour = getRandomElement(allColours).toLowerCase();
            const rule = getRandomElement(allRules).toLowerCase();
            const ordinalStr = ordinal(j + 1);

            clues.push(`The ${ordinalStr} rope to pull is the ${rule} ${colour} rope.`);
        }

        paragraphs.push(clues);
    }

    return paragraphs;

    function ordinal(n) {
        const suffixes = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
    }
}

router.get('/puz2_player1', function (req, res, next) {
    res.render('puz2_player1', {displayRopes, pullSequence});
});

router.post('/puz2_player1', function (req, res, next) {
    res.redirect('../puzzle3/puz3_player1');
});

router.get('/puz2_player2', function (req, res, next) {
    const correctParagraph = buildCorrectParagraph(displayRopes, pullSequence);
    const decoyParagraphs = buildDecoyParagraphs(displayRopes, 3);
    const ruleParagraphs = [correctParagraph, ...decoyParagraphs];
    shuffleArray(ruleParagraphs);

    console.log("ruleParagraphs:", ruleParagraphs);

    res.render('puz2_player2', {ruleParagraphs});
});

router.post('/puz2_player2', function (req, res, next) {
    res.redirect('../puzzle3/puz3_player2');
});

module.exports = router;