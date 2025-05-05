//Connect to the socket. This allows us to send information to player 2
const socket = io();

const row = document.getElementById('tableRow');
const hieroglyph = window.hieroglyph;

for (let i = 0; i < hieroglyph.length; i++) {
    const cell = row.insertCell();
    cell.innerText = hieroglyph[i];
    cell.className = "bg-yellow-400 text-black text-5xl px-20 py-2 rounded";
}

let correctAudio = document.getElementById("correctAudio");
let wrongAudio = document.getElementById("wrongAudio");
//Check if last submit was correct, and play corresponding sound file
//If variable is null, meaning no input has been yet, we do not play an audio file
let wrongPassword = window.wrongPassword;
if (wrongPassword != null) {
    if (wrongPassword === true) {
        document.getElementById("wrongPass").innerHTML = "Wrong password!";
        wrongAudio.volume = 0.5;
        wrongAudio.play();
    } else {
        correctAudio.volume = 0.5;
        correctAudio.play();
        correctAudio.addEventListener("ended", () => {
            //When the audio for correct input is done we refresh player 2's page and submit
            //the form. This allows both players in the puzzle1.js route to forward to puzzle 2
            socket.emit('newInput');
            document.getElementById("inputForm").submit()
        });
    }
}