//Connect to the socket. This allows us to send information to player 2
const socket = io();
socket.on('forwardToPuzzle3', () => {
    window.location.href = "/puzzle3/puz3_player1";
});

/*let test = 0;

function ropeKey(index) {
    if (index === 0) {
        test++;
        document.getElementById('testValue').textContent = test;
    }
} */

let currentStep = 0;

window.addEventListener("DOMContentLoaded", () => {
    const correctAudio = document.getElementById("correctAudio");
    const wrongAudio = document.getElementById("wrongAudio");

    const correctSequence = window.pullSequence;
    
    window.ropeKey = function(pulledIndex) {
        const ropePullOrder = correctSequence[pulledIndex];

        console.log("Pulled rope:", pulledIndex, "Pull Order:", ropePullOrder, "Current expected step:", currentStep);

        if (ropePullOrder === currentStep) {
            console.log("Correct pull");
            correctAudio.volume = 0.5;
            correctAudio.play();

            currentStep++;
            
            // Puzzle complete, forwarding to puzzle 3
            if (currentStep === correctSequence.length) {
                correctAudio.addEventListener("ended", () => {
                    socket.emit("puzzleSolved");
                    document.getElementById("advanceForm").submit();
                });
            }
        } else {
            console.log("Wrong pull");
            wrongAudio.volume = 0.5;
            wrongAudio.play();
            // Reset puzzle
            currentStep = 0;
        }
    };
});