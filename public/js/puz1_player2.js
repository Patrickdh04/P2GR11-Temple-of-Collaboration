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

//Create references to left and right tables
const leftTable = document.getElementById('leftDictionary');
const rightTable = document.getElementById('rightDictionary');

//Function to add header to table
function createHeader(table) {
    const header = document.createElement('tr');
    const letterHeader = document.createElement('th');
    const symbolHeader = document.createElement('th');

    letterHeader.textContent = 'Letter';
    symbolHeader.textContent = 'Symbol';

    header.appendChild(letterHeader);
    header.appendChild(symbolHeader);
    table.appendChild(header);
}

createHeader(leftTable);
createHeader(rightTable);

for (let i = 0; i < alphabet.length; i++) {
    const row = document.createElement('tr');

    const letterCell = document.createElement('td');
    letterCell.textContent = alphabet[i];

    const symbolCell = document.createElement('td');
    symbolCell.textContent = code_alphabet[i];

    row.appendChild(letterCell);
    row.appendChild(symbolCell);

    if (i < 13) {
        leftTable.appendChild(row);
    } else {
        rightTable.appendChild(row);
    }
}