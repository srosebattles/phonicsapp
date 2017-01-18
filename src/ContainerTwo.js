import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TargetBin from './TargetBin';
import Box from './Box';
import ItemTypes from './ItemTypes';
import update from 'react/lib/update';


@DragDropContext(HTML5Backend)
export default class ContainerTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      targetbins: [
        { accepts: [ItemTypes.BOX], lastDroppedItem: null },
      ],
      boxes: [
        { name: 'ck', type: ItemTypes.BOX, origin: 'http://phonicsaudiofiles.s3.amazonaws.com/soundCK.mp3' },
        { name: 'h', type: ItemTypes.BOX, origin: 'http://phonicsaudiofiles.s3.amazonaws.com/soundH.mp3' },
        { name: 'r', type: ItemTypes.BOX, origin: 'http://phonicsaudiofiles.s3.amazonaws.com/soundR.mp3'},
        { name: 'e', type: ItemTypes.BOX, origin: 'http://phonicsaudiofiles.s3.amazonaws.com/shortE.mp3'},
        { name: 'm', type: ItemTypes.BOX, origin: 'http://phonicsaudiofiles.s3.amazonaws.com/soundM.mp3'},
        { name: 'd', type: ItemTypes.BOX, origin: 'http://phonicsaudiofiles.s3.amazonaws.com/soundD.mp3'}
      ],
      droppedBoxNames: [],
      answerShouldBe: 'http://phonicsaudiofiles.s3.amazonaws.com/soundR.mp3',
      userAnswer: '',
      totalCorrect: 0
    };
  }

  componentWillReceiveProps(newProps){
    console.log(newProps)
    this.setState({
      answerShouldBe: newProps.answerShouldBe
    })
  }

  render() {
    const { targetbins, boxes } = this.state;
    return (
      <div>
        <div style={{ overflow: 'hidden', clear: 'both' }}>
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
        <h3>You've gotten  {this.state.totalCorrect}  right! Good job!</h3>
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
      // console.log(this.state)
      // console.log("userAnswer", this.state.userAnswer)
      this.checkIfCorrect();
    });

  }

  isDropped(name) {
    console.log('I was dropped', name);
  }

  checkIfCorrect() {
    // console.log("guessed " + this.state.userAnswer)
    // console.log("real answer " + this.state.answerShouldBe)
    if (this.state.userAnswer === this.state.answerShouldBe) {
      // console.log("Winner winner chicken dinner")
      document.getElementById("goodWork").play();
      this.props.nextSound();
      this.oneMoreCorrect();
    } else {
      // console.log("I am sad. You made me sad.")
      document.getElementById("tryAgain").play();
    }
  }


  oneMoreCorrect() {
    var totalCorrect = this.state.totalCorrect
    totalCorrect++
    this.setState({
      totalCorrect: totalCorrect
    })
    console.log("var " + totalCorrect)
    console.log("state " + this.state.totalCorrect)
  }
}
