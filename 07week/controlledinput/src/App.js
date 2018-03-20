import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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
      <MuiThemeProvider>
      <div className="App">
        <input value={this.state.inputValue} onChange={this.handleInputChange}></input>
        {this.state.inputValue}
      </div>
    </MuiThemeProvider>
    );
  }
}

export default App;
