const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function guess(MAX, done) {   
    let randNumb = Math.floor((Math.random()*100)+1);
    let attempts = 0;
    ask();
    function ask() {
        rl.question(`Enter your guess: `, x => {
            x = Number(x);

            if (x > randNumb) {
                console.log("Your guess is higher than the targetted number.\n");
            }
            else if (x < randNumb) {
                console.log("Your guess is lower than the targetted number.\n");
            }
            else {
                console.log(`DING DING DINGGG!!!! you wonnnn\n you won in ${attempts+1} attmepts`);
                return done();   
            }

            attempts++;

            if (attempts === MAX) {
                console.log("no more attempts loser!\n");
                return done();  
            }

            ask();
        });
    }

    
}

function getDiff(callback) {
    rl.question(`Enter the number of you difficulty level: `, dif => {
        let maxAttempts=0;

        if (dif == 1) maxAttempts = 10;
        else if (dif == 2) maxAttempts = 5;
        else if (dif == 3) maxAttempts = 3;
        else {
            console.log("please enter 1 for easy difficulty, 2 for medium difficulty, or 3 for hard difficulty next time");
            return getDiff(callback);
        }

        callback(maxAttempts);
    });
}

function again() {
    rl.question(`Enter the character 'y' if you want to play another round: `, resume => {
        if (resume !== 'y' && resume !== 'Y') {
            console.log("exitting game...");
            rl.close();
        } else {
            console.log("we go for another round YAYYYYY!\n");
            Play();
        }
    });
}

function Play() {
    getDiff(max => {
        guess(max, () => {
            again();
        });
    });
}

console.log("This is the number guessing game where you guess the number in range 1 to 100 and there's 3 difficulty levels \n1)easy:you get 10 guesses.\n2)medium: you get 5 guesses.\n3)hard:you get 3 guesses.\n");

Play();
