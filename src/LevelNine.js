import React, { Component } from 'react';
import './App.css';
import AudioPlayer from './AudioPlayer.js';
import ContainerNine from './ContainerNine';
var uniqueRandomArray = require('unique-random-array');

export default class LevelNine extends Component {
  constructor() {
    super();
    this.state = {
      soundLink: "http://phonicsaudiofiles.s3.amazonaws.com/soundAI.mp3",
      answerShouldBe: "http://phonicsaudiofiles.s3.amazonaws.com/soundAI.mp3",
      chosenSound: uniqueRandomArray(["soundAI.mp3", "soundEE.mp3", "soundIE.mp3","soundUE.mp3", "soundOU.mp3", "soundOOcool.mp3", "sound00good.mp3"])
    }
  }
//redo IE
  onChangeSound(e) {
    this.nextSound()
  }

  nextSound(){
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
        <audio id="goodWork">
          <source src="http://phonicsaudiofiles.s3.amazonaws.com/goodwork.mp3" type="audio/mpeg" />
        </audio>
        <audio id="tryAgain">
          <source src="http://phonicsaudiofiles.s3.amazonaws.com/tryagain.mp3" type="audio/mpeg" />
        </audio>
        <AudioPlayer src={this.state.soundLink}></AudioPlayer>
        <br/>
        <ContainerNine nextSound={this.nextSound.bind(this)} answerShouldBe={this.state.answerShouldBe} />
      </div>
    );
  }
  }
