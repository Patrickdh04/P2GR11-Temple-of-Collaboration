const express = require('express');
const router = express.Router();

//player1 logic

let amountOfButtons = 6;

function checkIntegerInArray(array, integer) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === integer) {
            return true;
        }
    }
    return false;
}

function randomColor(arrayBackgroundColor, arrayFontColor, arrayFontText) {
    let result = [];
    let randIndex;
    for (let i = 0; i < amountOfButtons; i++) {
        randIndex = Math.floor(Math.random() * arrayBackgroundColor.length);
        result.push({
            backgroundColor: arrayBackgroundColor[randIndex],
            fontColor: arrayFontColor[randIndex],
            fontText: arrayFontText[randIndex]
        });
        arrayBackgroundColor.splice(randIndex, 1);
        arrayFontColor.splice(randIndex, 1);
        arrayFontText.splice(randIndex, 1);
        console.log(arrayBackgroundColor);
    }
    return result;
}
const arrayBackgroundColor = ["#2103FC", "#FC2103", "#03FC21", "#D5792A", "#EED911", "#DA0AF5", "#F708A2", "#F87107", "#877878"];
const arrayFontColor =       ["#03FC21", "#2103FC", "#FC2103", "#EED911", "#DA0AF5", "#D5792A", "#F87107", "#877878", "#F708A2"];
const arrayFontText =        ["RED",     "GREEN",   "BLUE",    "GREY",    "ORANGE",  "PINK",    "YELLOW",  "PURPLE",  "BROWN"];
const arrayOfColors = randomColor(arrayBackgroundColor, arrayFontColor, arrayFontText);




router.get('/puz3_player1', function (req, res, next) {
    res.render('puz3_player1', {arrayOfColors: arrayOfColors});
});

//player2 logic

let cellColors = arrayFontColor.slice(0, 3);
const possibleDistributions = [25, 28, 20, 22];
const colorDistribution = [];
for (let i = 0; i < cellColors.length; i++) {
    let  randIndex = Math.floor(Math.random() * possibleDistributions.length);
    colorDistribution[i] = possibleDistributions[randIndex];
    possibleDistributions.splice(randIndex, 1);
}

router.get('/puz3_player2', function (req, res, next) {
    res.render('puz3_player2', {colorDistribution: colorDistribution, cellColors: cellColors});
});

module.exports = router;
