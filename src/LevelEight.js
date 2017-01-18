import React, { Component } from 'react';
import './App.css';
import AudioPlayer from './AudioPlayer.js';
import ContainerTwo from './ContainerTwo';
var uniqueRandomArray = require('unique-random-array');

export default class LevelEight extends Component {
  constructor() {
    super();
    this.state = {
      soundLink: "http://phonicsaudiofiles.s3.amazonaws.com/soundR.mp3",
      answerShouldBe: "http://phonicsaudiofiles.s3.amazonaws.com/soundR.mp3",
      chosenSound: uniqueRandomArray(["soundR.mp3", "soundH.mp3", "soundM.mp3","soundD.mp3"])
    }
  }

  onChangeSound(e) {
    this.nextSound()
  }

  nextSound(){
    // console.log("loading next sound")
    var thisSound = this.state.chosenSound()
     console.log(thisSound)
    this.setState({
      soundLink: "http://phonicsaudiofiles.s3.amazonaws.com/" + thisSound,
      answerShouldBe: "http://phonicsaudiofiles.s3.amazonaws.com/" + thisSound
    })
  }

  render() {
    return (
      <div>
        <h1>This is level eight</h1>
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
        <ContainerTwo nextSound={this.nextSound.bind(this)} answerShouldBe={this.state.answerShouldBe} />
      </div>
    );
  }
  }
