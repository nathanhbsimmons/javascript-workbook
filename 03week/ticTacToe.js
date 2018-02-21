'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

let playerTurn = 'X';

//each row on the board is a seperate array. Each of these arrays are set to a
//different variable to more easily mainpulate them
// let rowZero = board[0]
// let rowOne = board[1]
// let rowTwo = board[2]

function printBoard() {
  console.log('   0  1  2');
  console.log('0 ' + board[0].join(' | '));
  console.log('  ---------');
  console.log('1 ' + board[1].join(' | '));
  console.log('  ---------');
  console.log('2 ' + board[2].join(' | '));
};

function horizontalWin() {
  //checks for the 3 cases of a horizontal win for each player
  // if (board[0].every(playerTurn) || board[1].every(playerTurn) || board[2].every(playerTurn))
  if ((board[0][0] === playerTurn && board[0][1] === playerTurn && board[0][2] === playerTurn) ||
    (board[1][0] === playerTurn && board[1][1] === playerTurn && board[1][2] === playerTurn) ||
    (board[2][0] === playerTurn && board[2][1] === playerTurn && board[2][2] === playerTurn))
  {
    console.log(`${playerTurn} wins!`)
    return true
  }
};

function verticalWin() {
  //checks for the 3 cases of a vert win for each player
  if ((board[0][0] === playerTurn && board[1][0] === playerTurn && board[2][0] === playerTurn) ||
    (board[0][1] === playerTurn && board[1][1] === playerTurn && board[2][1] === playerTurn) ||
    (board[0][2] === playerTurn && board[1][2] === playerTurn && board[2][2] === playerTurn) ) {
    console.log(`${playerTurn} wins!`)
    return true
  }
};

function diagonalWin() {
  //checks for last 2 cases of win, diagonally, for each player
  if ((board[0][0] === playerTurn && board[1][1] === playerTurn && board[2][2] === playerTurn) ||
    (board[0][2] === playerTurn && board[1][1] === playerTurn && board[2][0] === playerTurn)) {
    console.log(`${playerTurn} wins!`)
    return true
  }
};


function checkForWin() {
  //8 winning cases are checked with 3 seperate functions, starting with horizontal
  return horizontalWin() || diagonalWin() || verticalWin()
  
};

function switchPlayerTurn() {
//checks for which playerTurn it is and alternates back and forth each turn
  if (playerTurn === 'X'){
    playerTurn = 'O'
  } else {
    playerTurn = 'X'
  }
};

function ticTacToe(row, column) {
  //reassigning value of board array and index with the playerTurn of 'X' or 'O'
  board[row][column] = playerTurn

  if (checkForWin()){
    return
  } else {
    switchPlayerTurn()
  }
};

function getPrompt() {
  printBoard();
  console.log("It's Player " + playerTurn + "'s turn.");
  rl.question('row: ', (row) => {
    rl.question('column: ', (column) => {
      ticTacToe(row, column);
      getPrompt();
    });
  });

}



// Tests

if (typeof describe === 'function') {

  describe('#ticTacToe()', () => {
    it('should place mark on the board', () => {
      ticTacToe(1, 1);
      assert.deepEqual(board, [ [' ', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should alternate between players', () => {
      ticTacToe(0, 0);
      assert.deepEqual(board, [ ['O', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should check for vertical wins', () => {
      board = [ [' ', 'X', ' '], [' ', 'X', ' '], [' ', 'X', ' '] ];
      assert.equal(verticalWin(), true);
    });
    it('should check for horizontal wins', () => {
      board = [ ['X', 'X', 'X'], [' ', ' ', ' '], [' ', ' ', ' '] ];
      assert.equal(horizontalWin(), true);
    });
    it('should check for diagonal wins', () => {
      board = [ ['X', ' ', ' '], [' ', 'X', ' '], [' ', ' ', 'X'] ];
      assert.equal(diagonalWin(),  true);
    });
    it('should detect a win', () => {
      assert.equal(checkForWin(), true);
    });
  });
} else {

  getPrompt();

}
