const express = require('express');
const router = express.Router();
const  {startNewPuzzle3}= require('./functions');

//Initialise all variables for puzzle 3
let [arrayOfColors, colorPool, cellColors, possibleAnswers, isMax, correctColor]
    = startNewPuzzle3();
let timesCleared = 0;
let timesToClear = 3;
let correctAnswer = false;

router.get('/puz3_player1', function (req, res, next) {
    res.render('puz3_player1', {
        arrayOfColors,
        timesCleared,
        timesToClear,
        correctAnswer: null
    });
});

router.get('/puz3_player2', function (req, res, next) {
    res.render('puz3_player2', {
        colorPool,
        cellColors,
        possibleAnswers,
        isMax,
        timesCleared,
        timesToClear
    });
});

router.get('/congrats', function (req, res, next) {
    res.render('congrats');
})

router.post('/puz3_player1', function (req, res, next) {
    console.log("Font color button: " + req.body.fontColorOfButton);
    if (req.body.fontColorOfButton === correctColor) {
        console.log("You got it right!");
        timesCleared++;
        correctAnswer = true;
    } else {
        console.log("You got it wrong!");
        timesCleared = 0;
        correctAnswer = false;
    }
    console.log("Times cleared: " + timesCleared);
    if (timesCleared >= timesToClear) {
        res.redirect('congrats');
    } else {
        [arrayOfColors, colorPool, cellColors, possibleAnswers, isMax, correctColor]
            = startNewPuzzle3();
        res.render('puz3_player1', {
            arrayOfColors,
            timesCleared,
            timesToClear,
            correctAnswer,
        });
    }
});

router.post('/puz3_player2', function (req, res, next) {
    if (timesCleared >= timesToClear) {
        res.redirect('congrats');
    }
})

module.exports = router;