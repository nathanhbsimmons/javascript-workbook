import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import './App.css';
import ListContainer from './ListContainer.js';

class App extends Component {
  constructor(props){
    super(props)
      this.state = {
        inputValue: '',
        list: [],
      }

  }

  handleClick=(e)=>{
    const newList = [...this.state.list]

    newList.push(this.state.inputValue)

    this.setState({
      list: newList,
      inputValue: ''
    })
  }

  handleInputChange=(e)=>{
    this.setState({
    inputValue: e.target.value
  })
  }

  render() {
    return (
      <MuiThemeProvider>
      <div className="App">
        <input value={this.state.inputValue} onChange={this.handleInputChange}></input>
        <button onClick={this.handleClick}>Submit</button>
        <ListContainer></ListContainer>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
