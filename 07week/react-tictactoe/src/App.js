import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Row from './Row.js';
import Square from './Square.js'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      board: [[null, null, null], [null, null, null], [null, null, null]],
      playerTurn: 'x',

    }
  }

  isPlayerTurn=(val)=> {
  return val === this.state.playerTurn
}


  horizontalWin=()=> {
  //checks for the 3 cases of a horizontal win for each player
    return this.state.board[0].every(this.isPlayerTurn) || this.state.board[1].every(this.isPlayerTurn) || this.state.board[2].every(this.isPlayerTurn)
  }


  verticalWin=()=> {
  //checks for the 3 cases of a vert win for each player
    return (this.state.board[0][0] === this.state.playerTurn && this.state.board[1][0] === this.state.playerTurn && this.state.board[2][0] === this.state.playerTurn) ||
      (this.state.board[0][1] === this.state.playerTurn && this.state.board[1][1] === this.state.playerTurn && this.state.board[2][1] === this.state.playerTurn) ||
      (this.state.board[0][2] === this.state.playerTurn && this.state.board[1][2] === this.state.playerTurn && this.state.board[2][2] === this.state.playerTurn)
  }

  diagonalWin=()=> {
  //checks for last 2 cases of win, diagonally, for each player
    return (this.state.board[0][0] === this.state.playerTurn && this.state.board[1][1] === this.state.playerTurn && this.state.board[2][2] === this.state.playerTurn) ||
      (this.state.board[0][2] === this.state.playerTurn && this.state.board[1][1] === this.state.playerTurn && this.state.board[2][0] === this.state.playerTurn)
  }

  checkForWin=()=> {
  //8 winning cases are checked with 3 seperate functions, starting with horizontal
  if(this.horizontalWin() || this.diagonalWin() || this.verticalWin()){
    console.log('win')
  }

};

  switchPlayerTurn=()=>{
    if (this.state.playerTurn === 'x') {
      this.state.playerTurn = 'o'
    } else {
      this.state.playerTurn = 'x'
    }
  }

  handleClick=(rowNum, squareNum)=>{
    const newBoard = this.state.board
    newBoard[rowNum][squareNum] = this.state.playerTurn
    this.setState({board: newBoard})

    this.checkForWin()
    this.switchPlayerTurn()



  }

  render() {
    return (
      <div >
        <Row
          board={ this.state.board } myClick={(rowNum, squareNum)=> this.handleClick(rowNum, squareNum)}
        />
      </div>
    )
  }
}

export default App;
