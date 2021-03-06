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

const possibleInputs = ['a', 'b', 'c']

const printStacks=()=> {
  console.log("--------------");//added lines before and after stacks to increase readability
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
  console.log("--------------");
}

const towersOfHanoi=(startStack, endStack)=> {
  isMoveIllegal(startStack, endStack);//triggers the isMoveIllegal() function to check for valid moves and input before moving pieces
  checkForWin();//check for win after every move
  resetGame();//if there is a win, the game will reset after showing the winner their game board
}

const isMoveIllegal=(startStack, endStack)=> {
  //check for valid stack letter input of a, b or c. if input is not a,b,c
  //it will have a -1 index due to not being in possibleInputs array
  if (possibleInputs.indexOf(startStack) === -1 || possibleInputs.indexOf(endStack) === -1){
    console.log("Not a valid stack input.")
    return true
  //prevent movePiece() from popping an empty string from startStack and pushing
  //an empty string to endStack by checking array length
  } else if (stacks[startStack].length === 0){
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

const movePiece=(startStack, endStack)=> {
  //use pop() method to remove last item from startStack array and use push() method
  //to add the popped number to endStack array
  return stacks[endStack].push(stacks[startStack].pop())
}

const checkForWin=()=> {
  if (stacks.b.length === 4 || stacks.c.length === 4){//checks for the only 2 cases of winning
    console.log("You're a winner!!")
  }
}

const resetBoard=()=>{
  stacks = {//sets the value of stack back to the original value
    a: [4, 3, 2, 1],
    b: [],
    c: []
  }
}

const resetGame=()=> {
  if(checkForWin()){
    printStacks();//show the winner their winning stack before resetting the game board
    console.log("Start new game")
    resetBoard();
  }
}


const getPrompt=()=> {
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
      assert.equal(isMoveIllegal('a', 'b'), true);
    });
    it('should detect a win', () => {
      stacks = {
        a: [],
        b: [4, 3, 2,1],
        c: []
      };
      assert.equal(checkForWin(), resetGame());
    });
    it('should reset board and game', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      resetBoard();
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
