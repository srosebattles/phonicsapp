import React, { Component } from 'react';
import './App.css';
import AudioPlayer from './AudioPlayer.js'
import ExampleContainer from './ExampleContainer'
require('unique-random-array')

export default class LevelOne extends Component {
  constructor() {
    super();
    this.state = {
      soundLink: "http://phonicsaudiofiles.s3.amazonaws.com/shortA.mp3",
      answerShouldBe: "http://phonicsaudiofiles.s3.amazonaws.com/shortA.mp3"
    }
  }

  onChangeSound(e) {
    var uniqueRandomArray = require('unique-random-array')
    var chosenSound = uniqueRandomArray(["shortA.mp3", "soundS.mp3","soundT.mp3","shortI.mp3", "soundP.mp3","soundN.mp3"])
    // console.log(chosenSound)
    var thisSound = chosenSound()
    // console.log(thisSound)
    this.setState({
      soundLink: "http://phonicsaudiofiles.s3.amazonaws.com/" + thisSound,
      answerShouldBe: "http://phonicsaudiofiles.s3.amazonaws.com/" + thisSound
    })
  }

  render() {
    return (
      <div>
        <h1>This is level one</h1>
        <audio id="goodWork">
          <source src="http://phonicsaudiofiles.s3.amazonaws.com/goodwork.mp3" type="audio/mpeg" />
        </audio>
        <audio id="tryAgain">
          <source src="http://phonicsaudiofiles.s3.amazonaws.com/tryagain.mp3" type="audio/mpeg" />
        </audio>
        <button onClick={this.onChangeSound.bind(this)}>New Sound</button>
        <br/>
        <AudioPlayer src={this.state.soundLink}></AudioPlayer>
        <br/>
        <ExampleContainer />
      </div>
    );
  }
}
