// Below shuffle function from: https://www.geeksforgeeks.org/how-to-shuffle-an-array-using-javascript/
export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function startNewPuzzle3() {
    let arrayOfColors = newPuz3Player1();
    let [colorPool, cellColors, possibleAnswers, isMax, correctColor] = newPuz3Player2(arrayOfColors);
    return [arrayOfColors, colorPool, cellColors, possibleAnswers, isMax, correctColor];
}

function newPuz3Player1() {
    let arrayBackgroundColor = ["#0083FF", "#FC2103", "#03FC21", "#D5792A", "#EED911", "#CE00FF", "#F708A2", "#F87107", "#877878"];
    let arrayFontColor = ["#03FC21", "#0083FF", "#FC2103", "#EED911", "#CE00FF", "#D5792A", "#F87107", "#877878", "#F708A2"];
    let arrayFontText = ["RED", "GREEN", "BLUE", "GREY", "ORANGE", "PINK", "YELLOW", "PURPLE", "BROWN"];
    return randomColor(arrayBackgroundColor, arrayFontColor, arrayFontText);
}

function randomColor(arrayBackgroundColor, arrayFontColor, arrayFontText) {
    let result = [];
    let randIndex;
    let amountOfButtons = 6;
    for (let i = 0; i < amountOfButtons; i++) {
        randIndex = Math.floor(Math.random() * arrayBackgroundColor.length);
        result.push({
            backgroundColor: arrayBackgroundColor[randIndex],
            fontColor: arrayFontColor[randIndex],
            fontText: arrayFontText[randIndex]
        });
        arrayBackgroundColor.splice(randIndex, 1);
        arrayFontColor.splice(randIndex, 1);
        arrayFontText.splice(randIndex, 1);
    }
    return result;
}

function newPuz3Player2(arrayOfColors) {
    let cellColors = ["green", "red", "blue", "yellow"];
//Sum of the possible distributions HAS to be 100
    const possibleDistributions = [25, 30, 25, 20];
    const colorDistribution = [];
    for (let i = 0; i < cellColors.length; i++) {
        let randIndex = Math.floor(Math.random() * possibleDistributions.length);
        colorDistribution[i] = possibleDistributions[randIndex];
        possibleDistributions.splice(randIndex, 1);
    }
    console.log("Min color: " + cellColors[colorDistribution.indexOf(20)] + "Max color: " + cellColors[colorDistribution.indexOf(30)]);

//Add each all 100 colors for the cells to colorPool
    let colorPool = [];
    colorDistribution.forEach((count, index) => {
        for (let i = 0; i < count; i++) {
            colorPool.push(index);
        }
    });
//Shuffle colorPool to randomize order of cell colors
    shuffleArray(colorPool);

//Get 4 font colors from player 1's buttons. One of them will be the correct "answer"
    let amountOfPossibleAnswers = 4;
    const possibleAnswers = [];
    const player1Colors = arrayOfColors.slice();
    for (let i = 0; i < amountOfPossibleAnswers; i++) {
        let randIndex = Math.floor(Math.random() * player1Colors.length);
        possibleAnswers.push(player1Colors[randIndex].fontColor);
        player1Colors.splice(randIndex, 1);
    }

//We save the correct answer as index 0, as the colors are already in a random order
    let correctColor = possibleAnswers[0];
    let isMax = Math.random() > 0.5;
    let correctAnswer;
    if (isMax) {
        correctAnswer = colorDistribution.indexOf(30);
    } else {
        correctAnswer = colorDistribution.indexOf(20);
    }
//We swap the previous correct answer with the new index
//When we send the possibleAnswers array to puz3_player2 it will have the right answer
//as the corresponding correct index, matching the right color of either max or min
    [possibleAnswers[0], possibleAnswers[correctAnswer]] = [possibleAnswers[correctAnswer], possibleAnswers[0]];
    console.log(possibleAnswers);
    return [colorPool, cellColors, possibleAnswers, isMax, correctColor];
}