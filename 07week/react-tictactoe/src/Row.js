import React, {Component} from 'react';
import Square from './Square.js'

class Row extends Component {
  handleClick(squareNum, rowNum) {
    this.props.myClick(squareNum, rowNum)
  }

  render() {
    const rowStyle = {
      color: 'red',
      height: '110px',
      fontSize: '40px',
      margin: '5px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    }

    return (<div >
      {
        this.props.board.map((arr, index) => {
          return <div key={index} style={rowStyle}><Square arr={arr} rowNum={index} board={this.props.board} stillMyClick={(rowNum, squareNum) => this.props.myClick(rowNum, squareNum)}/></div>
        })
      }
    </div>)
  }
}

export default Row;
