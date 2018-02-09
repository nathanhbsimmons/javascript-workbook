'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

function printStacks() {
  console.log("--------------");//added lines before and after stacks to increase readability
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
  console.log("--------------");
}

function movePiece(startStack, endStack) {
  //use pop() method to remove last item from startStack array and use push() method
  //to add the popped number to endStack array
  stacks[endStack].push(stacks[startStack].pop())
  //check for win after every move
  return checkForWin();
}

function isLegal(startStack, endStack) {
  //prevent movePiece() from popping an empty string from startStack and pushing
  //an empty string to endStack
  if (stacks[startStack].length == 0){
    console.log("Can't start from an empty stack!")
    return true
  //prevent movePiece() from adding a greater number to a stack/array ending with a larger number
  } else if (stacks[startStack][stacks[startStack].length-1] > stacks[endStack][stacks[endStack].length-1]){
    console.log("Can't move larger number on top of smaller number")
    return true
  //if move is legal then it will return the movePiece() function
  } else {
    return movePiece(startStack, endStack);
  }
}

function checkForWin() {
  if (stacks.b.length === 4 || stacks.c.length === 4){//checks for the only 2 cases of winning
    console.log("You're a winner!!")
    printStacks();//show the winner their winning stack before resetting the game board
    console.log("Start new game")
    return reset();//if there is a win, the game will reset after showing the winner their game board
  }
}

function reset(){
  stacks = {//sets the value of stack back to the original value
    a: [4, 3, 2, 1],
    b: [],
    c: []
  }
}

function towersOfHanoi(startStack, endStack) {
  isLegal(startStack, endStack);//triggers the isLegal() function to check for valid moves before moving pieces
}

function getPrompt() {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}



if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should move stacks', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, {
        a: [4, 3, 2],
        b: [1],
        c: []
      })
    });
    it('should not allow illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), true);
    });
    it('should detect a win', () => {
      stacks = {
        a: [],
        b: [4, 3, 2,1],
        c: []
      };
      assert.equal(checkForWin(), reset());
    });
    it('should reset', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      reset();
      assert.deepEqual(stacks, {
        a: [4, 3, 2,1],
        b: [],
        c: []
      })
    });
  });
} else {

  getPrompt();

}


// getPrompt();
