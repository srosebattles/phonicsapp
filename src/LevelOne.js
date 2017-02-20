import React, { Component } from 'react';
import './App.css';
import AudioPlayer from './AudioPlayer.js'
import ExampleContainer from './ExampleContainer'
var uniqueRandomArray = require('unique-random-array')

export default class LevelOne extends Component {
  constructor() {
    super();
    this.state = {
      soundLink: "http://phonicsaudiofiles.s3.amazonaws.com/shortA.mp3",
      answerShouldBe: "http://phonicsaudiofiles.s3.amazonaws.com/shortA.mp3",
      chosenSound: uniqueRandomArray(["shortA.mp3", "soundS.mp3","soundT.mp3","shortI.mp3", "soundP.mp3"])
    }
  }

  componentDidMount(){
    document.getElementById("directions").play();
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
        <audio autoplay="autoplay" id="directions">
          <source src="http://phonicsaudiofiles.s3.amazonaws.com/PhonicsAppDirections.mp3" type="audio/mpeg" />
        </audio>
        <audio id="goodWork">
          <source src="http://phonicsaudiofiles.s3.amazonaws.com/goodwork.mp3" type="audio/mpeg" />
        </audio>
        <audio id="tryAgain">
          <source src="http://phonicsaudiofiles.s3.amazonaws.com/tryagain.mp3" type="audio/mpeg" />
        </audio>
        <AudioPlayer src={this.state.soundLink}></AudioPlayer>
        <br/>
        <ExampleContainer nextSound={this.nextSound.bind(this)} answerShouldBe={this.state.answerShouldBe} />
      </div>
    );
  }
}
