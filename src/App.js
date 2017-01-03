import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AudioPlayer from './AudioPlayer.js';
import {Link} from 'react-router';
require('unique-random-array')

class App extends Component {
  constructor() {
    super();
    this.state = {
      soundLink: "http://phonicsaudiofiles.s3.amazonaws.com/shortA.mp3"
    }
  }

  onChangeSound(e) {
    var uniqueRandomArray = require('unique-random-array')
    var chosenSound = uniqueRandomArray(["shortA.mp3", "soundS.mp3","soundT.mp3","shortI.mp3", "soundP.mp3","soundN.mp3"])
    console.log(chosenSound)
    var thisSound = chosenSound()
    console.log(thisSound)
    this.setState({
      soundLink: "http://phonicsaudiofiles.s3.amazonaws.com/" + thisSound
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="navDiv">
          <ul className="nav">
            <li className="navItem"><Link to={'/1'}>Level One</Link></li>
            <li className="navItem"><Link to={'/2'}>Level Two</Link></li>
          </ul>
        </div>
          {this.props.children}
      </div>
    );
  }
}

export default App;
