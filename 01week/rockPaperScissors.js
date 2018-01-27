'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({input: process.stdin, output: process.stdout});

const rockPaperScissors = (hand1, hand2) => {

  const checkForWin = (hand1, hand2) => {
    // SOLUTION #1:
    // solution using if/else statements to take care of all 9 possible cases
    if (hand1 === hand2) { // first if takes care of 3 cases of tie
      return "It's a tie!"
    } else if ((hand1 === 'rock' && hand2 === 'scissors') || //second if takes care of 3 cases where hand1 wins
    (hand1 === 'paper' && hand2 === 'rock') || (hand1 === 'scissors' && hand2 === 'paper')) {
      return "Hand one wins!"
    } else { //else takes care of last 3 cases where hand2 wins
      return "Hand two wins!"
    };

    // SOLUTION #2:
    //  alternate solution using if and switch statements that takes care of all 9 possible cases
    // if(hand1 === hand2) return 'The result is a tie!'; checks for tie result first, eliminates 3 cases
    //
    // switch(hand1+hand2){  switch takes input of both strings and concatnates them into single string which can then be tested for truthiness
    // case 'rockscissors':  3 more cases eliminated when hand1 the winner
    // case 'paperrock':
    // case 'scissorspaper':
    //   return "Hand one wins!"
    //   break;
    // default:  remaining 3 cases taken care when hand2 the winner
    //   return "Hand two wins!"
    // };
  }

  const isUserInputValid = (hand1, hand2) => {
    const possibleInputs = ['rock', 'paper', 'scissors']
    const newHand1 = hand1.toLowerCase().trim()
    const newHand2 = hand2.toLowerCase().trim()

    if ((possibleInputs.indexOf(newHand1) !== -1) || (possibleInputs.indexOf(newHand2) !== -1)) {
      return checkForWin(hand1, hand2);
    } else {
      return 'Invalid input! Please try again and type either rock, paper or scissors'
    }
  }

  return isUserInputValid(hand1, hand2);
}

function getPrompt() {
  rl.question('hand1: ', (answer1) => {
    rl.question('hand2: ', (answer2) => {
      console.log(rockPaperScissors(answer1, answer2));
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#rockPaperScissors()', () => {
    it('should detect a tie', () => {
      assert.equal(rockPaperScissors('rock', 'rock'), "It's a tie!");
      assert.equal(rockPaperScissors('paper', 'paper'), "It's a tie!");
      assert.equal(rockPaperScissors('scissors', 'scissors'), "It's a tie!");
    });
    it('should detect which hand won', () => {
      assert.equal(rockPaperScissors('rock', 'paper'), "Hand two wins!");
      assert.equal(rockPaperScissors('paper', 'scissors'), "Hand two wins!");
      assert.equal(rockPaperScissors('rock', 'scissors'), "Hand one wins!");
    });
    it('should scrub input to ensure lowercase with "trim"ed whitepace', () => {
      assert.equal(rockPaperScissors('rOcK', ' paper '), "Hand two wins!");
      assert.equal(rockPaperScissors('Paper', 'SCISSORS'), "Hand two wins!");
      assert.equal(rockPaperScissors('rock ', 'sCiSsOrs'), "Hand one wins!");
    });
  });
} else {

  getPrompt();

}
