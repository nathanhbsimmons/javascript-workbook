'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({input: process.stdin, output: process.stdout});

let playerTurn = 'b' //need a place to store player turn

const switchPlayerTurn = () => { //switches player turn with if/else
  if (playerTurn = 'b') {
    playerTurn = 'r'
  } else {
    playerTurn = 'b'
  }
}

class Checker {
  constructor(symbol) {
    //stores the string that will actually be printed to the board representing the checker object
    this.symbol = symbol;
  }
}

const checkerBlack = new Checker('b')//new instance of Checker class as a black checker piece
const checkerRed = new Checker('r')//new instance of Checker class as a red checker piece

class Board {
  constructor() {
    this.grid = [];
    this.checkers = [];//this will store the values of all checker pieces on the board
  }
  // creates an 8x8 array, filled with null values
  createGrid() {
    // loop to create the 8 rows
    for (let row = 0; row < 8; row++) {
      this.grid[row] = [];
      // push in 8 columns of nulls
      for (let column = 0; column < 8; column++) {
        this.grid[row].push(null); //REPLACE NULL WITH CHECKER PIECES INPUT
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
  setPieces() {
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

    //loops through every index of grid array, each of which is itself an array
    for (let row = 0; row < 8; row++) {
      //loops through every index of each row array
      for (let column = 0; column < 8; column++) {
        //for every even numbered row array (from arrays 0 to 2), push in a
        //black checker piece at every odd numbered index
        if (row < 3 && row % 2 === 0 && column % 2 === 1) {
          this.grid[row][column] = checkerBlack
          this.checkers.push(checkerBlack)
        //for every odd numbered array (from arrays 0 to 2), push in a
        //black checker piece at every even numbered index
        } else if (row < 3 && row % 2 === 1 && column % 2 === 0) {
          this.grid[row][column] = checkerBlack
          this.checkers.push(checkerBlack)
        //for every even numbered row array (from arrays 5 to 7), push in a
        //red checker piece at every odd numbered index
        } else if (row > 4 && row % 2 === 0 && column % 2 === 1) {
          this.grid[row][column] = checkerRed
          this.checkers.push(checkerRed)
          //for every odd numbered array (from arrays 5 to 7), push in a
          //red checker piece at every even numbered index
        } else if (row > 4 && row % 2 === 1 && column % 2 === 0) {
          this.grid[row][column] = checkerRed
          this.checkers.push(checkerRed)
        }
      }
    }
    // console.log(this.checkers)
  }
}




class Game {
  constructor(board) {
    this.board = new Board();

  }
  start() {
    this.board.createGrid();
    this.board.setPieces();
    // Your code here
  }

  moveChecker(whichPiece, toWhere) {
    if (this.isLegalMove(whichPiece, toWhere) || this.jumpAndKill(whichPiece, toWhere)) {
      //removes value at toWhere column/index of toWhere row/array and replaces it with piece that is moving
      this.board.grid[toWhere[0]].splice([toWhere[1]], 1, this.board.grid[whichPiece[0]][whichPiece[1]])
      //removes value at whichPiece column/index of whichPiece row/array and replaces it with null as placeholder
      this.board.grid[whichPiece[0]].splice([whichPiece[1]], 1, null)
    }

    //alternate way to move piece (is this more immutable??)
    // this.board.grid[toWhere[0]][toWhere[1]] = this.board.grid[whichPiece[0]][whichPiece[1]]
    // this.board.grid[whichPiece[0]][whichPiece[1]] = null

  }
  isLegalMove(whichPiece, toWhere) {
    //first check if piece is black
    if (this.board.grid[whichPiece[0]][whichPiece[1]] === checkerBlack){
      //JUMP AND KILL MOVE - checks if space to move to is empty(null),
      //two rows(arrays) away and diagonal (two columns(indexes) to the left or right)
      if (this.board.grid[toWhere[0]][toWhere[1]] === null &&
      toWhere[0] == (Number(whichPiece[0]) + 2) &&
      (toWhere[1] == (Number(whichPiece[1]) + 2) || toWhere[1] == (Number(whichPiece[1]) - 2))) {
        return this.jumpAndKill(whichPiece, toWhere)
      } else {
        //NORMAL MOVE - checks if space to move to is empty(null),
        //one row(array) forward and diagonal (one column(index) to the left or to the right)
        return this.board.grid[toWhere[0]][toWhere[1]] === null &&
        toWhere[0] == (Number(whichPiece[0]) + 1) &&
        (toWhere[1] == (Number(whichPiece[1]) + 1) || toWhere[1] == (Number(whichPiece[1]) - 1))
      }
    } else if (this.board.grid[whichPiece[0]][whichPiece[1]] === checkerRed){
      //JUMP AND KILL MOVE - checks if space to move to is empty(null),
      //two rows(arrays) away and diagonal (two columns(indexes) to the left or right)
      if (this.board.grid[toWhere[0]][toWhere[1]] === null &&
      toWhere[0] == (Number(whichPiece[0]) - 2) &&
      (toWhere[1] == (Number(whichPiece[1]) + 2) || toWhere[1] == (Number(whichPiece[1]) - 2))){
        return this.jumpAndKill(whichPiece, toWhere)
      } else {
        //NORMAL MOVE - if piece being moved is red, checks if space to move to is empty(null),
        //one row(array) forward and diagonal (one column to the left or to the right)
        return this.board.grid[toWhere[0]][toWhere[1]] === null &&
          toWhere[0] == (Number(whichPiece[0]) - 1) &&
          (toWhere[1] == (Number(whichPiece[1]) + 1) || toWhere[1] == (Number(whichPiece[1]) - 1))
      }
    }
  }

  jumpAndKill(whichPiece, toWhere) {
    if (this.board.grid[whichPiece[0]][whichPiece[1]] === checkerBlack) {
      if (toWhere[1] == (Number(whichPiece[1]) + 2)){

        return (this.board.grid[Number(whichPiece[0]) + 1].splice([Number(whichPiece[1]) + 1], 1, null) &&
        this.board.checkers.pop())

      } else if (toWhere[1] == (Number(whichPiece[1]) - 2)){
        return (this.board.grid[Number(whichPiece[0]) + 1].splice([Number(whichPiece[1]) - 1], 1, null) &&
        this.board.checkers.pop())
      }
    } else if (this.board.grid[whichPiece[0]][whichPiece[1]] === checkerRed){
      if (toWhere[1] == (Number(whichPiece[1]) + 2)){
        
        return (this.board.grid[Number(whichPiece[0]) - 1].splice([Number(whichPiece[1]) + 1], 1, null) &&
        this.board.checkers.shift())

      } else if (toWhere[1] == (Number(whichPiece[1]) - 2)){
        return (this.board.grid[Number(whichPiece[0]) - 1].splice([Number(whichPiece[1]) - 1], 1, null) &&
        this.board.checkers.shift())

      }
    }

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

  describe('Game.moveChecker()', function() {
    it('should move a checker', function() {
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
