'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// let row//need a place to store row and column input
// let column
let playerTurn = 'b'//need a place to store player turn

const switchPlayerTurn=()=>{//switches player turn with if/else
  if (playerTurn = 'b'){
    playerTurn = 'r'
  } else {
    playerTurn = 'b'
  }
}

class Checker {
  constructor(symbol){
    this.symbol = symbol;
    this.checkers = [];
  }
  // Your code here
}
const checkerB = new Checker ('b')
const checkerR = new Checker ('r')

class Board {
  constructor () {
    this.grid = [];
  }
  // creates an 8x8 array, filled with null values
  createGrid() {
    // loop to create the 8 rows
    for (let row = 0; row < 8; row++) {
      this.grid[row] = [];
      // push in 8 columns of nulls
      for (let column = 0; column < 8; column++) {
        this.grid[row].push(null);//REPLACE NULL WITH CHECKER PIECES INPUT
      }
    }
  };

  // prints out the board
  viewGrid() {
    // add our column numbers
    let string = "  0 1 2 3 4 5 6 7\n";
    for (let row = 0; row < 8; row++) {
      // we start with our row number in our array
      const rowOfCheckers = [row];
      // a loop within a loop
      for (let column = 0; column < 8; column++) {
        // if the location is "truthy" (contains a checker piece, in this case)
        if (this.grid[row][column]) {
          // push the symbol of the check in that location into the array
          rowOfCheckers.push(this.grid[row][column].symbol);
        } else {
          // just push in a blank space
          rowOfCheckers.push(' ');
        }
      }
      // join the rowOfCheckers array to a string, separated by a space
      string += rowOfCheckers.join(' ');
      // add a 'new line'
      string += "\n";
    }
    console.log(string);
  };
  setPieces(){
    for (let row = 0; row < 8; row++){


          for (let column = 0; column < 8; column++){

            if(row%2 === 0 && column%2 === 1){
              console.log('inside')
              this.grid[row][column] === checkerB
            } else if (row%2 === 1 && column%2 === 0){
              this.grid[row][column] === checkerR
            }
          }


    }
console.log(this.grid)
    // this.grid.forEach((row, col)=>{
    //
    //   if (row === 3 || row === 4) {
    //     console.log('nuill')
    //     this.grid[row][column] === null
    //   } else if (row%2 === 0 && column%2 === 1){
    //     this.grid[row][column] === checkerB
    //   } else if (row%2 === 1 && column%2 === 0){
    //     this.grid[row][column] === checkerR
    //   }
    // })

  }

  // Your code here
}
class Game {
  constructor(board){
    this.board = new Board();
  }
  start() {
    this.board.createGrid();
    this.board.setPieces();
    // Your code here
  }
  moveChecker(whichPiece) {
    board.grid[whichPiece[0]] //row of piece to move
    board.grid[whichPiece[1]] //column  of piece to move
    board.grid[toWhere[0]] //row to move piece to
    board.grid[toWhere[1]] //column to move piece to
  }
}



function getPrompt() {
  game.board.viewGrid();
  rl.question('which piece?: ', (whichPiece) => {
    rl.question('to where?: ', (toWhere) => {
      game.moveChecker(whichPiece, toWhere);
      getPrompt();
    });
  });
}

const game = new Game();
game.start();


// Tests

if (typeof describe === 'function') {
  describe('Game', () => {
    it('should have a board', () => {
      assert.equal(game.board.constructor.name, 'Board');
    });
    it('board should have 24 checkers', () => {
      assert.equal(game.board.checkers.length, 24);
    });
  });

  describe('Game.moveChecker()', function () {
    it('should move a checker', function () {
      assert(!game.board.grid[4][1]);
      game.moveChecker('50', '41');
      assert(game.board.grid[4][1]);
      game.moveChecker('21', '30');
      assert(game.board.grid[3][0]);
      game.moveChecker('52', '43');
      assert(game.board.grid[4][3]);
    });
    it('should be able to jump over and kill another checker', () => {
      game.moveChecker('30', '52');
      assert(game.board.grid[5][2]);
      assert(!game.board.grid[4][1]);
      assert.equal(game.board.checkers.length, 23);
    });
  });
} else {
  getPrompt();
}
