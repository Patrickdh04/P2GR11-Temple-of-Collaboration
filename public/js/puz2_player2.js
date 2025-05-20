//Connect to the socket. This allows us to listen for activity from player 1
const socket = io();

//Refresh page when player 1 presses a button
socket.on('refreshPage', () => {
    location.reload();
});

socket.on('puzzle3Done', () => {
    document.getElementById("submitForm").submit();
});
