const prompt = require("prompt-sync")();

// both min and max included
const getRandomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

while (true) {
    const lowerNumber = getRandomInteger(0, 49);
    const upperNumber = getRandomInteger(50, 100);
    const randomNumber = getRandomInteger(lowerNumber, upperNumber);

    let guessedNumber;
    for (let i = 0; ; ++i) {
        guessedNumber = Number(prompt(`Guess a number in range [${lowerNumber},${upperNumber}]: `));
        if (guessedNumber > randomNumber) {
            console.log("You guessed a greater number.");
        } else if (guessedNumber < randomNumber) {
            console.log("You guessed a smaller number");
        } else {
            console.log("You guessed it right");
            break;
        }
    }

    console.log("\n");
    const quit = prompt("Do you want to quit? ['yes' to quit]");
    if (quit.toLowerCase() === "yes") {
        break;
    }
    console.log("\n");
}

