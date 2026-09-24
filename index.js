const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");

const gameInterface = readline.createInterface({ input, output });

// both min and max included
const getRandomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const playGame = async () => {
    while (true) {
        const lowerNumber = getRandomInteger(0, 49);
        const upperNumber = getRandomInteger(50, 100);
        const randomNumber = getRandomInteger(lowerNumber, upperNumber);

        let guessedNumber;
        for (;;) {
            guessedNumber = Number(await gameInterface.question(`Guess a number in range [${lowerNumber},${upperNumber}]: `));
            if (Number.isNaN(guessedNumber)) {
                console.log("Please enter a number.");
            } else if (guessedNumber > randomNumber) {
                console.log("You guessed a greater number.");
            } else if (guessedNumber < randomNumber) {
                console.log("You guessed a smaller number.");
            } else {
                console.log("You guessed it right");
                break;
            }
        }

        console.log("\n");
        const quit = await gameInterface.question("Do you want to quit? ['yes' to quit] ");
        if (quit.trim().toLowerCase() === "yes") {
            break;
        }
        console.log("\n");
    }

    gameInterface.close();
};

playGame();

