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
  console.log("--------------");
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
  console.log("--------------");
}

function movePiece(startStack, endStack) {
  stacks[endStack].push(stacks[startStack].pop())

  return checkForWin();
}

function isLegal(startStack, endStack) {
  if (stacks[startStack].length == 0){
    console.log("Can't start from an empty stack!")
    return true
  } else if (stacks[startStack][stacks[startStack].length-1] > stacks[endStack][stacks[endStack].length-1]){
    console.log("Can't move larger number on top of smaller number")
    return true
  } else {
    return movePiece(startStack, endStack);
  }

}

function checkForWin() {
  if (stacks.b.length === 4 || stacks.c.length === 4){
    console.log("you're a winner")
    printStacks();
    return reset();
  }

}

function reset(){
  stacks = {
    a: [4, 3, 2, 1],
    b: [],
    c: []
  }
}

function towersOfHanoi(startStack, endStack) {
  isLegal(startStack, endStack);

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
