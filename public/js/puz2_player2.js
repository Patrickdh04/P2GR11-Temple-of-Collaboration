//Connect to the socket. This allows us to listen for activity from player 1
const socket = io();

socket.on('forwardToPuzzle3', () => {
    window.location.href = "/puzzle3/puz3_player2";
});

//Refresh page when player 1 presses a button
socket.on('refreshPage', () => {
    location.reload();
});

