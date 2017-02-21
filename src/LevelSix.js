import React, { Component } from 'react';
import './App.css';
import AudioPlayer from './AudioPlayer.js';
import ContainerTwo from './ContainerTwo';
var uniqueRandomArray = require('unique-random-array');

export default class LevelSix extends Component {
  constructor() {
    super();
    this.state = {
      soundLink: "http://phonicsaudiofiles.s3.amazonaws.com/shortA.mp3",
      answerShouldBe: "http://phonicsaudiofiles.s3.amazonaws.com/shortA.mp3",
      chosenSound: uniqueRandomArray(["shortA.mp3", "shortI.mp3", "shortO.mp3","shortU.mp3", "shortE2.mp3"])
    }
  }

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
        <audio id="tenRight">
          <source src="http://phonicsaudiofiles.s3.amazonaws.com/10right.mp3" type="audio/mpeg" />
        </audio>
        <audio id="twentyRight">
          <source src="http://phonicsaudiofiles.s3.amazonaws.com/20points.mp3" type="audio/mpeg" />
        </audio>
        <audio id="thirtyRight">
          <source src="http://phonicsaudiofiles.s3.amazonaws.com/30right.mp3" type="audio/mpeg" />
        </audio>
        <audio id="fortyRight">
          <source src="http://phonicsaudiofiles.s3.amazonaws.com/40right.mp3" type="audio/mpeg" />
        </audio>
        <audio id="fiftyRight">
          <source src="http://phonicsaudiofiles.s3.amazonaws.com/50points.mp3" type="audio/mpeg" />
        </audio>
        <AudioPlayer src={this.state.soundLink}></AudioPlayer>
        <br/>
        <ContainerTwo nextSound={this.nextSound.bind(this)} answerShouldBe={this.state.answerShouldBe} />
      </div>
    );
  }
  }
