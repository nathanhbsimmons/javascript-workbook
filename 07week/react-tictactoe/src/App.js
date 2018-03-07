import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      board: [[null, 'x', null], ['x', null, null], [null, null, null]],
      row: null,
    }

    const playerturn = 'x'

  }


  switchPlayerTurn=()=>{

    if (this.playerTurn === 'x') {
      this.playerTurn = 'o'
    } else {
      this.playerTurn = 'x'
    }
  }


  handleClick=(i)=>{
    console.log(this.state.board)

    this.switchPlayerTurn()
  }
  // renderSquare(i) {
  //   return <Square />;
  // }


  render() {
    const rowStyle = {
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
      border: '1px solid black',
      color: 'black',
      fontSize: '60px'
      }
    return (
      <div >
        {this.state.board.map((arr, index)=>{
          const rowNum = index;
        return   <div key={index} style={rowStyle} >
          {arr.map((piece, i)=>{
            console.log(i)
            return (<button row={rowNum} key={i} index={i} style={boxStyle} onClick={()=> {this.handleClick(row, column)}}>{this.state.board[this.props.row][this.props.index]}x</button>);
          })}
          </div>
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

// class Square extends React.Component {
//   constructor (props) {
//     super(props)
//     this.state = {
//       board: [[null, 'x', null], [null, null, null], [null, null, null]],
//       row: null,
//     }
//
//     const playerturn = 'x'
//
//   }
//   render() {
//     return (
//       <div className="square">
//         {}
//       </div>
//     );
//   }
// }

export default App;
