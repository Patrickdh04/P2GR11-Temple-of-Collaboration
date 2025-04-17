const express = require('express');
const router = express.Router();

let arrayOfNumbers = [];
let amountOfNumbers = 6;
let amountOfColors = 11;
for (let i = 0; i < amountOfNumbers; i++) {
    arrayOfNumbers[i] = Math.floor(Math.random() * amountOfColors);
}
let arrayBackgroundColor=["#EE2A11","#11D5EE","#7F05CC", "#51CC05","#F9D706","#0628F9","#00FF41","#FF00BE", "#861CE3", "#E3861C", "#ff8c00", "#00FF00"];
let arrayFontColor=["#11D5EE", "#EE2A11","#51CC05","#7F05CC","#0628F9","#F9D706","#FF00BE","#00FF41", "#E3861C", "#861CE3", "#00FF00", "#ff8c00"  ];
let arrayFontText=["GREEN","PURPLE"];

router.get('/puz3_player1', function (req, res, next) {
    res.render('puz3_player1', {arrayOfNumbers: arrayOfNumbers});
});
module.exports = router;