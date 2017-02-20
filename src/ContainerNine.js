import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TargetBin from './TargetBin';
import Box from './Box';
import ItemTypes from './ItemTypes';
import update from 'react/lib/update';


@DragDropContext(HTML5Backend)
export default class ExampleContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      targetbins: [
        { accepts: [ItemTypes.BOX], lastDroppedItem: null },
      ],
      boxes: [
        { name: 'ai', type: ItemTypes.BOX, origin: 'http://phonicsaudiofiles.s3.amazonaws.com/soundAI.mp3'},
        { name: 'ee', type: ItemTypes.BOX, origin: 'http://phonicsaudiofiles.s3.amazonaws.com/soundEE.mp3'},
        { name: 'ie', type: ItemTypes.BOX, origin: 'http://phonicsaudiofiles.s3.amazonaws.com/soundIE.mp3'},
        { name: 'ue', type: ItemTypes.BOX, origin: 'http://phonicsaudiofiles.s3.amazonaws.com/soundUE.mp3'},
        { name: 'ou', type: ItemTypes.BOX, origin: 'http://phonicsaudiofiles.s3.amazonaws.com/soundOU.mp3'},
        { name: 'oo', type: ItemTypes.BOX, origin: 'http://phonicsaudiofiles.s3.amazonaws.com/soundOOcool.mp3'},
      ],
      droppedBoxNames: [],
      answerShouldBe: 'http://phonicsaudiofiles.s3.amazonaws.com/soundAI.mp3',
      userAnswer: '',
      totalCorrect: 0
    };
  }

  componentWillReceiveProps(newProps){
    this.setState({
      answerShouldBe: newProps.answerShouldBe
    })
  }

  render() {
    const { targetbins, boxes } = this.state;
    return (
      <div className="binAndBoxes">
        <div>
          <div className="binDiv" style={{ overflow: 'hidden', clear: 'both' }}>
          {targetbins.map(({ accepts, lastDroppedItem }, index) =>
            <TargetBin accepts={accepts}
                     lastDroppedItem={lastDroppedItem}
                     onDrop={(item) => this.handleDrop(index, item)}
                     key={index} />
          )}
          </div>
          <div style={{ overflow: 'hidden', clear: 'both' }}>
          {boxes.map(({ name, type, origin }, index) =>
            <Box name={name}
                 type={type}
                 origin={origin}
                 isDropped={this.isDropped.bind(this, name, origin)}
                 key={index} />
          )}
          </div>
          <div>
          {this.state.totalCorrect > 0 ? <h3>Youve gotten  {this.state.totalCorrect}  right! Good job!</h3>:null }
          </div>
        </div>

        {this.props.children}
      </div>
    );
  }

  handleDrop(index, item) {
    const { name, origin } = item;
    // console.log(item.name, item.origin)
    this.setState(update(this.state,{
       targetbins: {
         [index]: {
           lastDroppedItem: {
             $set: item
          }
        }
      },
        droppedBoxNames: name ? {
          $push: [name]
        } : {},
        userAnswer: {$set: item.origin}
    }),()=>{
      this.checkIfCorrect();
    });

  }

  isDropped(name) {
    console.log('I was dropped', name);
  }

  checkIfCorrect() {

    if (this.state.userAnswer === this.state.answerShouldBe) {
      document.getElementById("goodWork").play();
      this.props.nextSound();
      this.oneMoreCorrect();
      this.checkTotalCorrect();
    } else {
      document.getElementById("tryAgain").play();
    }
  }

  oneMoreCorrect() {
    let totalCorrect = this.state.totalCorrect
    totalCorrect++
    this.setState({
      totalCorrect: totalCorrect
    })
  }

  checkTotalCorrect(){
  if (this.state.totalCorrect === 9) {
      setTimeout(function(){document.getElementById("tenRight").play();}, 1000)
      setTimeout(function(){document.getElementById("phoneme").play();}, 3000)
   } else if (this.state.totalCorrect === 19){
    setTimeout(function(){document.getElementById("twentyRight").play();}, 1000)
    setTimeout(function(){document.getElementById("phoneme").play();}, 4500)
   } else if (this.state.totalCorrect === 29){
    setTimeout(function(){document.getElementById("thirtyRight").play();}, 1000)
    setTimeout(function(){document.getElementById("phoneme").play();}, 3000)
   } else if (this.state.totalCorrect === 39){
    setTimeout(function(){document.getElementById("fortyRight").play();}, 1000)
    setTimeout(function(){document.getElementById("phoneme").play();}, 4500)
   } else if (this.state.totalCorrect === 49){
    setTimeout(function(){document.getElementById("fiftyRight").play();}, 1000)
    setTimeout(function(){document.getElementById("phoneme").play();}, 5500)
   }
  }
}
