import React, { Component } from 'react';
import './App.css';
import AudioPlayer from './AudioPlayer.js'
require('unique-random-array')

export default class LevelTwo extends Component {
  constructor() {
    super();
    this.state = {
      soundLink: "http://phonicsaudiofiles.s3.amazonaws.com/soundR.mp3"
    }
  }

  onChangeSound(e) {
    var uniqueRandomArray = require('unique-random-array')
    var chosenSound = uniqueRandomArray(["soundH.mp3","soundR.mp3","soundM.mp3","soundD.mp3"])
    // record ck and e again
    console.log(chosenSound)
    var thisSound = chosenSound()
    console.log(thisSound)
    this.setState({
      soundLink: "http://phonicsaudiofiles.s3.amazonaws.com/" + thisSound
    })
  }

  render() {
    return (
      <div>
        <h1>This is level two</h1>
        <audio controls>
          <source src="http://phonicsaudiofiles.s3.amazonaws.com/goodwork.mp3" type="audio/mpeg" />
        </audio>
        <br/>
        <button onClick={this.onChangeSound.bind(this)}>New Sound</button>
        <br/>
        <AudioPlayer src={this.state.soundLink}></AudioPlayer>
      </div>
    );
  }
}
