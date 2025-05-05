//Connect to the socket. This allows us to listen for activity from player 1
const socket = io();
//Refresh page when player 1 submits correct answer
socket.on('refreshPage', () => {
    location.reload();
});
//When player 1 gets the password right, wrongPassword is set to false.
//We then submit the form to trigger the router.post function in the puzzle1.js route
//This redirects player 2 to puzzle 2
let wrongPassword = window.wrongPassword;
if (wrongPassword === false) {
    document.getElementById("submitForm").submit();
}

let table = document.getElementById("dictionaryTable");
const alphabet = window.alphabet;
let code_alphabet = window.code_alphabet;

let row_normal1 = table.insertRow(0);
row_normal1.classList.add("norm");
let row_code1 = table.insertRow(1);
row_code1.classList.add("code");

let row_normal2 = table.insertRow(2);
row_normal2.classList.add("norm");
let row_code2 = table.insertRow(3);
row_code2.classList.add("code");

for (let i = 0; i < alphabet.length / 2; i++) {
    row_normal1.insertCell(i).innerText = alphabet[i];
    row_code1.insertCell(i).innerText = code_alphabet[i];
}
for (let i = alphabet.length / 2; i < alphabet.length; i++) {
    row_normal2.insertCell(i - alphabet.length / 2).innerText = alphabet[i];
    row_code2.insertCell(i - alphabet.length / 2).innerText = code_alphabet[i];
}