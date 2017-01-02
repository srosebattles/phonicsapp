import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      soundLink: "http://phonicsaudiofiles.s3.amazonaws.com/shortA.mp3"
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
          <audio controls>
            <source src="http://phonicsaudiofiles.s3.amazonaws.com/goodwork.mp3" type="audio/mpeg" />
          </audio>
          <br/>
          <button>New Sound</button>
          <br/>
          <audio controls>
            <source src={this.state.soundLink} type="audio/mpeg" />
          </audio>
      </div>
    );
  }
}

export default App;
