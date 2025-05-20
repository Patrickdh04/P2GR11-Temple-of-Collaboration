//Connect to the socket. This allows us to send information to player 2
const socket = io();
socket.on('refreshPage', () => {
    location.reload();
});

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
                    socket.emit("puzzle3Done");
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