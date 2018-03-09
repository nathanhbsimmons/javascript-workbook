import React, {Component} from 'react';
import logo from './logo.svg';
// import './App.css';
import Row from './Row.js';
import Square from './Square.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      board: [
        [
          null, null, null
        ],
        [
          null, null, null
        ],
        [
          null, null, null
        ]
      ],
      playerTurn: 'X',
      winAlert: ''
    }
  }

  isPlayerTurn = (val) => {
    return val === this.state.playerTurn
  }

  horizontalWin = () => {
    //checks for the 3 cases of a horizontal win for each player
    return this.state.board[0].every(this.isPlayerTurn) ||
    this.state.board[1].every(this.isPlayerTurn) ||
    this.state.board[2].every(this.isPlayerTurn)
  }

  verticalWin = () => {
    //checks for the 3 cases of a vert win for each player
    return (this.state.board[0][0] === this.state.playerTurn &&
      this.state.board[1][0] === this.state.playerTurn &&
      this.state.board[2][0] === this.state.playerTurn) ||
      (this.state.board[0][1] === this.state.playerTurn &&
        this.state.board[1][1] === this.state.playerTurn &&
        this.state.board[2][1] === this.state.playerTurn) ||
        (this.state.board[0][2] === this.state.playerTurn &&
          this.state.board[1][2] === this.state.playerTurn &&
          this.state.board[2][2] === this.state.playerTurn)
  }

  diagonalWin = () => {
    //checks for last 2 cases of win, diagonally, for each player
    return (this.state.board[0][0] === this.state.playerTurn &&
      this.state.board[1][1] === this.state.playerTurn &&
      this.state.board[2][2] === this.state.playerTurn) ||
      (this.state.board[0][2] === this.state.playerTurn &&
        this.state.board[1][1] === this.state.playerTurn &&
        this.state.board[2][0] === this.state.playerTurn)
  }

  checkForWin = () => {
    //8 winning cases are checked with 3 seperate functions, starting with horizontal
    if (this.horizontalWin() || this.diagonalWin() || this.verticalWin()) {
      this.setState({winAlert: `${this.state.playerTurn} is the winner!!!`})
    }
  }

  switchPlayerTurn = () => {//*****REWRITE***** to not manipulate state directly(use this.setState)
    if (this.state.playerTurn === 'X') {
      this.state.playerTurn = 'O'
    } else {
      this.state.playerTurn = 'X'
    }
  }

  handleClick = (rowNum, squareNum) => {
    const newBoard = this.state.board
    newBoard[rowNum][squareNum] = this.state.playerTurn
    this.setState({board: newBoard})

    this.checkForWin()
    this.switchPlayerTurn()

  }

  render() {
    const alertStyle = {
      textAlign: 'center',
      fontSize: '40px',
      fontWeight: 'bold',
      margin: '20px'
    }
    return (


      <div>
      <h1 style={alertStyle}>Tic Tac Toe</h1>
      <div >
        <Row board={this.state.board}
          myClick={(rowNum, squareNum) => this.handleClick(rowNum, squareNum)}/>
      </div>
      <div style={alertStyle}>
        {this.state.winAlert}
      </div>
    </div>)
  }
}

export default App;
