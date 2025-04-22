const express = require('express');
const router = express.Router();


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
let arrayBackgroundColor = ["#2103FC", "#FC2103", "#03FC21", "#D5792A", "#EED911", "#DA0AF5", "#F708A2", "#F87107", "#877878"];
let arrayFontColor = ["#03FC21", "#2103FC", "#FC2103", "#EED911", "#DA0AF5", "#D5792A", "#F87107", "#877878", "#F708A2"];
let arrayFontText = ["RED", "GREEN", "ORANGE", "GREY", "BLUE", "PINK", "YELLOW", "PURPLE", "BROWN"];

let arrayOfColors = randomColor(arrayBackgroundColor, arrayFontColor, arrayFontText);

router.get('/puz3_player1', function (req, res, next) {
    res.render('puz3_player1', {arrayOfColors: arrayOfColors});
});
module.exports = router;
