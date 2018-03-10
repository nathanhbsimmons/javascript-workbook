import React, {Component} from 'react';

class Square extends Component {

  render() {
    const boxStyle = {//****WHY DO THE BUTTONS MOVE WHEN CLICKEDDDDDDD***
      height: '110px',
      width: '110px',
      backgroundColor: 'pink',
      margin: '20px',
      border: '1px solid black',
      color: 'black',
      fontSize: '60px',
      textAlign: 'center',
    }
    //nested map method, mapping through inner arrays, displaying the contents of each value in inner 3 array coordinates using passed down props to locate (sends row number and square number args up theough click event in order for click handler to be able to reassign value in array)
    return (<div>
      {
        this.props.arr.map((piece, index) => {
          const newBoard = this.props.board
          const rowNum = this.props.rowNum
          const squareNum = index
          const pieceIndex = newBoard[rowNum][squareNum]

          return <button style={boxStyle} key={index}
            onClick={() => this.props.squareClick(rowNum, squareNum)}>
            {pieceIndex}
          </button>
        })
      }
    </div>)
  }
}

export default Square;
