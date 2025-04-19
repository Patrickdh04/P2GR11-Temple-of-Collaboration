const express = require('express');
const router = express.Router();


let amountOfButtons = 6;

function randomColor(arrayBackgroundColor, arrayFontColor, arrayFontText) {
    let result = [];

    for (let i = 0; i < amountOfButtons; i++) {
        let randIndex = Math.floor(Math.random() * arrayBackgroundColor.length);

        result.push({
            backgroundColor: arrayBackgroundColor[randIndex],
            fontColor: arrayFontColor[randIndex],
            fontText: arrayFontText[randIndex]
        });
    }

    return result;
}

let arrayBackgroundColor = ["#2103FC", "#FC2103", "#03FC21", "#D5792A", "#EED911", "#DA0AF5", "#F708A2", "#F87107", "#877878", "#00F3FF", "#EB80F9", "#1CE337", "#D3AF37", "#D7D7D7", "#D47E30"];
let arrayFontColor = ["#03FC21", "#2103FC", "#FC2103", "#EED911", "#DA0AF5", "#D5792A", "#F87107", "#877878", "#F708A2", "#EB80F9", "#1CE337", "#00F3FF", "#D7D7D7", "#D47E30", "#D3AF37"];
let arrayFontText = ["RED", "GREEN", "BLUE", "BROWN", "YELLOW", "PURPLE", "PINK", "ORANGE", "GREY", "CYAN", "LAVENDER", "LIME GREEN", "BRONZE", "GOLD", "SILVER"];

let arrayOfColors = randomColor(arrayBackgroundColor, arrayFontColor, arrayFontText);

router.get('/puz3_player1', function (req, res, next) {
    res.render('puz3_player1', { arrayOfColors: arrayOfColors });
});
module.exports = router;
