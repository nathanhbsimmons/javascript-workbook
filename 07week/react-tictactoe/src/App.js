import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      board: [[null, 'x', null], [null, null, null], [null, null, null]],
      row: null,
    }

    const playerturn = 'x'

  }


  switchPlayerTurn=()=>{ //switches player turn with if/else

    if (this.playerTurn === 'x') {
      this.playerTurn = 'o'
    } else {
      this.playerTurn = 'x'
    }
  }

  insertPieces=()=>{
    const rowStyle = {
      backgroundColor: 'pink',
      color: 'red',
      height: '120px',
      fontSize: '40px',
      margin: '5px auto',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center'
    }



  }
  handleClick=(i)=>{
    console.log(this.state.board)

    this.switchPlayerTurn()
  }
  renderSquare(i) {
    return <Square />;
  }


  render() {
    const rowStyle = {
      backgroundColor: 'pink',
      color: 'red',
      height: '120px',
      fontSize: '40px',
      margin: '5px auto',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center'
    }
    const boxStyle = {
      height: '110px',
      width: '110px',
      backgroundColor: 'pink',
      margin: 'auto 20px',
      border: '1px solid black'
      }
    return (
      <div >
        {this.state.board.map((arr, i)=>{

          return arr.map((piece, i)=>{
            return (<div key={i} index={i} style={boxStyle} onClick={this.handleClick}>{piece}</div>);
          })
        })}
        {/* <div style={rowStyle}>
          <div key='0' style={boxStyle} onClick={this.handleClick} >{this.state.board[0][0]}</div>
          <div key='1' style={boxStyle}>{this.state.board[0][1]}</div>
          <div key='2' style={boxStyle}>{this.state.board[0][2]}</div>
        </div>
        <div style={rowStyle}>
          <div key='3' style={boxStyle}>{this.state.board[1][0]}</div>
          <div key='4' style={boxStyle}>{this.state.board[1][1]}</div>
          <div key='5' style={boxStyle}>{this.state.board[1][2]}</div>
        </div>
        <div style={rowStyle}>
          <div key='6' style={boxStyle}>{this.state.board[2][0]}</div>
          <div key='7' style={boxStyle}>{this.state.board[2][1]}</div>
          <div key='8' style={boxStyle}>{this.state.board[2][2]}</div>
        </div>
        {this.insertPieces()}
        <div style={this.props.boxStyle}>{this.insertPieces()}</div> */}
      </div>)

  }

}

class Square extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      board: [[null, 'x', null], [null, null, null], [null, null, null]],
      row: null,
    }

    const playerturn = 'x'

  }
  render() {
    return (
      <div className="square">
        {}
      </div>
    );
  }
}

export default App;
