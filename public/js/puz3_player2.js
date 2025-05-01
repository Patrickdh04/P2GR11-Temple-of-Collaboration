//Connect to the socket. This allows us to listen for activity from player 1
const socket = io();
//Refresh page when player 1 presses a button
socket.on('refreshPage', () => {
    location.reload();
});

let table = document.getElementById('tableColor');
let tableSize = 10;

//Get colors and colorPool from puzzle3.js
let colorPool = window.colorPool;
let cellColors = window.cellColors;
let colorIndex = 0;

for (let i = 0; i < tableSize; i++) {
    let row = table.insertRow(i);
    for (let j = 0; j < tableSize; j++) {
        row.insertCell(-1).style.backgroundColor = cellColors[colorPool[colorIndex]];
        colorIndex++;
    }
}

let tableAnswers = document.getElementById('tableAnswers');
let rowColors = tableAnswers.insertRow(0);
for (let i = 0; i < cellColors.length; i++) {
    rowColors.insertCell(-1).style.backgroundColor = cellColors[i];
}

let rowAnswers = tableAnswers.insertRow(1);
let possibleAnswers = window.possibleAnswers;
for (let i = 0; i < possibleAnswers.length; i++) {
    rowAnswers.insertCell(-1).style.backgroundColor = possibleAnswers[i];
}
console.log(possibleAnswers);

let isMax = window.isMax;
let playerInfo = document.getElementById('maxOrMin');
if (isMax) {
    playerInfo.innerHTML = "most";
} else {
    playerInfo.innerHTML = "least";
}

//When the correct amount of times the puzzle is clear in a row, submit a form to go to congrats.ejs
let timesCleared = window.timesCleared;
let timeToClear = window.timesToClear;
let submitForm = document.getElementById('submitForm');
if (timesCleared >= timeToClear) {
    submitForm.submit();
}