import React, {Component} from 'react';
// import './App.css';
import Row from './Row.js';
// import Square from './Square.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //3 arrays within an array, each holding 3 'null' place holder values to create board with
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
      playerTurn: 'X',//set initial playerTurn value to 'x'
      winAlert: ''
    }
  }
  //this function is only needed for every() method
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

  switchPlayerTurn = () => {//switches player turn without directly mutating state
    if (this.state.playerTurn === 'X') {
      this.setState({playerTurn: 'O'})
    } else {
      this.setState({playerTurn: 'X'})
    }
  }

  handleClick = (rowNum, squareNum) => {
    //click handler function
    const newBoard = [...this.state.board]//makes shallow copy of board arrays
    newBoard[rowNum][squareNum] = this.state.playerTurn//sets the contents of whatever button is clicked to whichever players turn it is
    this.setState({board: newBoard})//sets the board equal to the manipulated shallow copy
    this.checkForWin()//runs through all win cases
    this.switchPlayerTurn()//finally, switches playerTurn

  }

  render() {
    const style = {
      textAlign: 'center',
      fontSize: '40px',
      fontWeight: 'bold',
      margin: '20px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    }
    return (

      //divs render h1, alert for win and Row component (row component send down board props, and click handler props)
      <div>
        <h1 style={style}>Tic Tac Toe</h1>
        <div style={style}>
          <Row board={this.state.board}
            squareClick={(rowNum, squareNum) => this.handleClick(rowNum, squareNum)}/>
        </div>

        <div style={style}>
          {this.state.winAlert}
        </div>

    </div>)
  }
}

export default App;
