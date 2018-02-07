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
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

function movePiece(startStack, endStack) {
  stacks[endStack].push(stacks[startStack].pop())

  return checkForWin();
}

function isLegal(startStack, endStack) {
  if (stacks[startStack].length == 0){
    console.log("Can't start from an empty stack!")
    return
  } else if (stacks[startStack][stacks[startStack].length-1] > stacks[endStack][stacks[endStack].length-1]){
    console.log("Can't move larger number on top of smaller number")
    return
  } else {
    return movePiece(startStack, endStack);
  }

}

function checkForWin() {
  if (stacks.b.length === 4 || stacks.c.length === 4){
    console.log("you're a winner")
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

getPrompt();
