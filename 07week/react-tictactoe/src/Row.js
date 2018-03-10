import React, {Component} from 'react';
import Square from './Square.js'

class Row extends Component {
  handleClick(squareNum, rowNum) {
    this.props.myClick(squareNum, rowNum)
  }

  render() {
    const rowStyle = {
      height: '120px',
      margin: '5px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    }
    //map function cycles through each outer array and renders a square component which thenm cycles through each inner array creating 3 rows of 3 buttons (passes down arr props, board props, click handle props)
    return (<div>
      {
        this.props.board.map((arr, index) => {
          return <Square style={rowStyle} key={index} arr={arr} rowNum={index} board={this.props.board}
            squareClick={(rowNum, squareNum) => this.props.squareClick(rowNum, squareNum)}/>
        })
      }
    </div>)
  }
}

export default Row;
