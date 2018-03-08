import React, { Component } from 'react';

class Square extends Component{



  render(){
    const boxStyle = {
      height: '110px',
      width: '110px',
      backgroundColor: 'pink',
      margin: 'auto 20px',
      border: '1px solid black',
      color: 'black',
      fontSize: '60px'
      }
    return(
      <div>
        {this.props.arr.map((piece, index)=>{
          const newBoard = this.props.board
          const rowNum = this.props.rowNum
          const squareNum = index
          const pieceIndex = newBoard[rowNum][squareNum]

          return <button key={index} square={index} style={boxStyle} onClick={()=> this.props.stillMyClick(rowNum, squareNum)}>{pieceIndex}</button>
        })}
      </div>
    )
  }
}

export default Square;
