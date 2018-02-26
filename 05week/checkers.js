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
  }
  // Your code here
}
const checkerBlack = new Checker ('b')
const checkerRed = new Checker ('r')

class Board {
  constructor () {
    this.grid = [];
    this.checkers = [];
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
    // this.grid.map((row, column)=> {
    //   if(row<3 && row%2 === 0 && column%2 === 1){
    //     console.log('inside')
    //     this.grid[row][column] = checkerB
    //   } else if(row<3 && row%2 === 1 && column%2 === 0){
    //     console.log('inside')
    //     this.grid[row][column] = checkerB
    //   } else if (row>4 && row%2 === 0 && column%2 === 1){
    //     this.grid[row][column] = checkerR
    //   } else if (row>4 && row%2 === 1 && column%2 === 0){
    //     this.grid[row][column] = checkerR
    //   }
    // })

    for (let row = 0; row < 8; row++){


      for (let column = 0; column < 8; column++){

        if(row<3 && row%2 === 0 && column%2 === 1){
          this.grid[row][column] = checkerBlack
          this.checkers.push(checkerBlack)
        } else if(row<3 && row%2 === 1 && column%2 === 0){
          this.grid[row][column] = checkerBlack
          this.checkers.push(checkerBlack)
        } else if (row>4 && row%2 === 0 && column%2 === 1){
          this.grid[row][column] = checkerRed
          this.checkers.push(checkerRed)
        } else if (row>4 && row%2 === 1 && column%2 === 0){
          this.grid[row][column] = checkerRed
          this.checkers.push(checkerRed)
        }

      }


    }
    console.log(this.checkers.length)
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
  moveChecker(whichPiece, toWhere){
    this.board.grid[toWhere[0]].splice([toWhere[1]], 1, this.board.grid[whichPiece[0]][whichPiece[1]])
    this.board.grid[whichPiece[0]].splice([whichPiece[1]], 1, null)

    //alternate way to move piece (is this more immutable??)
    // this.board.grid[toWhere[0]][toWhere[1]] = this.board.grid[whichPiece[0]][whichPiece[1]]
    // this.board.grid[whichPiece[0]][whichPiece[1]] = null

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
