const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");

const gameInterface = readline.createInterface({ input, output });
const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const playGame = async () => {
    try {
        while (true) {
            const lowerNumber = 1;
            const upperNumber = 100;
            const randomNumber = getRandomInteger(lowerNumber, upperNumber);
            let attempts = 0;

            console.log(`\nI'm thinking of a whole number from ${lowerNumber} to ${upperNumber}.`);

            while (true) {
                const rawGuess = (await gameInterface.question("Your guess: ")).trim();
                const guessedNumber = Number(rawGuess);

                if (!/^\d+$/.test(rawGuess) || !Number.isInteger(guessedNumber)) {
                    console.log("Enter a whole number using digits 0-9.");
                    continue;
                }

                if (guessedNumber < lowerNumber || guessedNumber > upperNumber) {
                    console.log(`Choose a number from ${lowerNumber} to ${upperNumber}.`);
                    continue;
                }

                attempts += 1;
                if (guessedNumber > randomNumber) {
                    console.log("Too high.");
                } else if (guessedNumber < randomNumber) {
                    console.log("Too low.");
                } else {
                    console.log(`Correct! You found it in ${attempts} ${attempts === 1 ? "guess" : "guesses"}.`);
                    break;
                }
            }

            let replay;
            do {
                replay = (await gameInterface.question("Play another round? (yes/no): "))
                    .trim()
                    .toLowerCase();
                if (replay !== "yes" && replay !== "no") {
                    console.log("Please answer yes or no.");
                }
            } while (replay !== "yes" && replay !== "no");

            if (replay === "no") break;
        }
    } finally {
        gameInterface.close();
    }
};

playGame().catch((error) => {
    console.error("The game could not finish:", error.message);
    process.exitCode = 1;
});
