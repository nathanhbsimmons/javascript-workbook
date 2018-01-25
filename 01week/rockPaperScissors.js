'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const rockPaperScissors=(hand1, hand2)=> {

  // SOLUTION #1:
  // alternate solution using if/else statements to take care of all 9 possible cases
  if (hand1 === hand2){  // first if takes care of 3 cases of tie
    return 'The result is a tie!'  //second if takes care of 3 cases where hand1 wins
  } else if ((hand1 === 'rock' && hand2 === 'scissors') || (hand1 === 'paper' && hand2 === 'rock') || (hand1 === 'scissors' && hand2 === 'paper')){
    return `hand1 wins with ${hand1} beating ${hand2}!`
  } else {   //else takes care of last 3 cases where hand2 wins
    return `hand2 wins with ${hand2} beating ${hand1}!`
  };


  // //SOLUTION #2:
  // //solution using if and switch statements that takes care of all 9 possible cases
  // if(hand1 === hand2) return 'The result is a tie!'; //checks for tie result first, eliminates 3 cases
  //
  // switch(hand1+hand2){  //switch takes input of both strings and concatnates them into single string which can then be tested for truthiness
  // case 'rockscissors':  //3 more cases eliminated when hand1 the winner
  // case 'paperrock':
  // case 'scissorspaper':
  //   return `hand1 wins with ${hand1} beating ${hand2}!`
  //   break;
  // default:  //remaining 3 cases taken care when hand2 the winner
  //   return `hand2 wins with ${hand2} beating ${hand1}!`
  // };

}

function getPrompt() {
  rl.question('hand1: ', (answer1) => {
    rl.question('hand2: ', (answer2) => {
      console.log( rockPaperScissors(answer1, answer2) );
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
