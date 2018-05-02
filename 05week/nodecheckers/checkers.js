'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({input: process.stdin, output: process.stdout});

//stores turn count
let turns = 0

class Checker {
  constructor(symbol) {
    //stores the string that will actually be printed to the board representing the checker object
    this.symbol = symbol;
  }
}

const checkerBlack = new Checker('b')//new instance of Checker class as a black checker piece
const checkerRed = new Checker('r')//new instance of Checker class as a red checker piece
let playerTurn = checkerRed//set initial player turn

const switchPlayerTurn=()=>{ //switches player turn with if/else
  if (playerTurn === checkerRed) {
    playerTurn = checkerBlack
  } else {
    playerTurn = checkerRed
  }
}

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
        this.grid[row].push(null);
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
    console.log(`It is Player '${playerTurn.symbol}' turn`)//tell the user whos turn it is

  };
  setPieces() {
    //*** will map() work here instead of nested for loops??? ****
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
  }
}




class Game {
  constructor(board) {
    this.board = new Board();

  }
  start() {
    this.board.createGrid();
    this.board.setPieces();
  }

  moveChecker(whichPiece, toWhere) {
    //if isLegalMove() function returns truthy or if jumpAndKill()function returns truthy,
    //then run moveChecker() function
    if (this.isLegalMove(whichPiece, toWhere) || this.jumpAndKill(whichPiece, toWhere)) {
      //removes value at toWhere column/index of toWhere row/array and replaces it with piece that is moving
      this.board.grid[toWhere[0]].splice([toWhere[1]], 1, this.board.grid[whichPiece[0]][whichPiece[1]])
      //removes value at whichPiece column/index of whichPiece row/array and replaces it with null as placeholder
      this.board.grid[whichPiece[0]].splice([whichPiece[1]], 1, null)

      turns ++  //adds to turn count every move
      console.log(`*There are ${40 - turns} remaining turns*`)
      return switchPlayerTurn();
    } else {
      console.log('!!!Not a valid move!!!')
      return 'Not a valid move'
    }
    //alternate way to move piece (is this more immutable??)
    // this.board.grid[toWhere[0]][toWhere[1]] = this.board.grid[whichPiece[0]][whichPiece[1]]
    // this.board.grid[whichPiece[0]][whichPiece[1]] = null
  }

  isLegalMove(whichPiece, toWhere) {
    //first check if piece is black
    if (this.board.grid[whichPiece[0]][whichPiece[1]] === checkerBlack && playerTurn === checkerBlack){
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
    } else if (this.board.grid[whichPiece[0]][whichPiece[1]] === checkerRed && playerTurn === checkerRed){
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
      //checks if space to move to is 2 indexes to the right
      if (toWhere[1] == (Number(whichPiece[1]) + 2) &&
          //checks to make sure not jumping empty space
          this.board.grid[Number(whichPiece[0]) + 1][Number(whichPiece[1]) + 1] !== null){
        //returns mod of space of piece that is jumped
        return (this.board.grid[Number(whichPiece[0]) + 1].splice([Number(whichPiece[1]) + 1], 1, null) &&
        this.board.checkers.pop())//pops off one of the red checker objects off of checkers array
      //checks if space to move is 2 indexes to left
      } else if (toWhere[1] == (Number(whichPiece[1]) - 2) &&
        //checks to make sure not jumping empty space
        this.board.grid[Number(whichPiece[0]) + 1][Number(whichPiece[1]) - 1] !== null){
        //returns mod of space of piece that is jumped
        return (this.board.grid[Number(whichPiece[0]) + 1].splice([Number(whichPiece[1]) - 1], 1, null) &&
        this.board.checkers.pop())//pops off one of the red checker objects off of checkers array
      }
    } else if (this.board.grid[whichPiece[0]][whichPiece[1]] === checkerRed){
      //checks if space to move to is 2 indexes to the right
      if (toWhere[1] == (Number(whichPiece[1]) + 2) &&
          //checks to make sure not jumping empty space
          this.board.grid[Number(whichPiece[0]) - 1][Number(whichPiece[1]) + 1] !== null){
        //returns mod of space of piece that is jumped
        return (this.board.grid[Number(whichPiece[0]) - 1].splice([Number(whichPiece[1]) + 1], 1, null) &&
        this.board.checkers.shift())//shifts off one of the black checker objects off of checkers array
      //checks if space to move is 2 indexes to left
      } else if (toWhere[1] == (Number(whichPiece[1]) - 2) &&
        //checks to make sure not jumping empty space
        this.board.grid[Number(whichPiece[0]) - 1][Number(whichPiece[1]) - 1] !== null){
        //returns mod of space of piece that is jumped
        return (this.board.grid[Number(whichPiece[0]) - 1].splice([Number(whichPiece[1]) - 1], 1, null) &&
        this.board.checkers.shift())//shifts off one of the black checker objects off of checkers array
      }
    }

  }
  isCheckerBlack(piece1){
    return piece1 === checkerBlack
  }
  isCheckerRed(piece2){
    return piece2 === checkerRed
  }
  checkForWin(){
    if(turns === 40){
      const blackCheckerPieces = this.board.checkers.filter(this.isCheckerBlack)
      const redCheckerPieces = this.board.checkers.filter(this.isCheckerRed)
      if (blackCheckerPieces.length > redCheckerPieces.length){
        console.log('Black wins!!')
        return 'Black wins!!'
      } else {
        console.log('Red wins!!')
        return 'Red wins!!'
      }
    }
  }
}

function getPrompt() {
  game.board.viewGrid();
  rl.question('which piece?: ', (whichPiece) => {
    rl.question('to where?: ', (toWhere) => {
      game.moveChecker(whichPiece, toWhere);
      game.checkForWin();
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
