import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
      this.state = {
        inputValue: '',
      }

  }

  handleInputChange=(e)=>{
    this.setState({
    inputValue: e.target.value
  })
  }

  render() {
    return (
      <div className="App">
        <input value={this.state.inputValue} onChange={this.handleInputChange}></input>
        {this.state.inputValue}
      </div>
    );
  }
}

export default App;
