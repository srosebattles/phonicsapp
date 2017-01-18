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
        { name: 's', type: ItemTypes.BOX, origin: 'http://phonicsaudiofiles.s3.amazonaws.com/soundS.mp3' },
        { name: 'a', type: ItemTypes.BOX, origin: 'http://phonicsaudiofiles.s3.amazonaws.com/shortA.mp3' },
        { name: 't', type: ItemTypes.BOX, origin: 'http://phonicsaudiofiles.s3.amazonaws.com/soundT.mp3'},
        { name: 'i', type: ItemTypes.BOX, origin: 'http://phonicsaudiofiles.s3.amazonaws.com/shortI.mp3'},
        { name: 'p', type: ItemTypes.BOX, origin: 'http://phonicsaudiofiles.s3.amazonaws.com/soundP.mp3'},
        { name: 'n', type: ItemTypes.BOX, origin: 'http://phonicsaudiofiles.s3.amazonaws.com/soundN.mp3'}
      ],
      droppedBoxNames: [],
      answerShouldBe: 'http://phonicsaudiofiles.s3.amazonaws.com/shortA.mp3',
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
        {this.state.totalCorrect > 0 ? <h3>You've gotten  {this.state.totalCorrect}  right! Good job!</h3>:null }
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
