//Connect to the socket. This allows us to send information to player 2
const socket = io();

let correctAudio = document.getElementById("correctAudio");
let wrongAudio = document.getElementById("wrongAudio");
//Check if last button press was correct, and play corresponding sound file
//If variable is null, meaning no button has been pressed yet, we do not play an audio file
let correctAnswer = window.correctAnswer;
if (correctAnswer != null) {
    if (correctAnswer) {
        correctAudio.volume = 0.5;
        correctAudio.play();
    } else {
        wrongAudio.volume = 0.5;
        wrongAudio.play();
    }
}

let buttons = [button1, button2, button3, button4, button5, button6];
button1 = document.getElementById("button1");
button2 = document.getElementById("button2");
button3 = document.getElementById("button3");
button4 = document.getElementById("button4");
button5 = document.getElementById("button5");
button6 = document.getElementById("button6");

let randomColors = window.arrayOfColors;

for (let i = 0; i < buttons.length; i++) {
    buttons[i].style.color = randomColors[i].fontColor;
    buttons[i].style.backgroundColor = randomColors[i].backgroundColor;
    buttons[i].innerHTML = randomColors[i].fontText;
}

//When a button is pressed, font color is saved, and then checked in puzzle3.js
function checkColor(button) {
    //Make player 2 refresh with new amount of times cleared
    socket.emit('puzzle3NewInput');
    //Here we use the toHexString() function from w3schools to make sure the
    //font color is saved in the same format as it was originally assigned as,
    //earlier in this script tag. This allows for correct comparisons on the server.
    document.getElementById("fontColorOfButton").value = w3color(button.style.color).toHexString().toUpperCase();
    document.getElementById("buttonForm").submit();
}