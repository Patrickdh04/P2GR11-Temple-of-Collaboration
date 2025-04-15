var express = require('express');
var router = express.Router();

const ropeColor = ["Yellow", "Blue", "Green", "Orange", "Purple", "Red", "Cyan", "Black"];
const rules = ["First", "Striped", "Half white", "Not straight", "Longest"];

// import * as functions from "./functions.js";

function shuffle(array) {
    let oldElement;
    for (let i = array.length - 1; i > 0; i--) {
        let rand = Math.floor(Math.random() * (i + 1));
        oldElement = array[i];
        array[i] = array[rand];
        array[rand] = oldElement;
    }
    return array;
}

shuffle(ropeColor);

module.exports = router;