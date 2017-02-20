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
      setTimeout(function(){document.getElementById("phoneme").play();
       console.log("play sound")}, 2000)
    } else {
      document.getElementById("tryAgain").play();
      setTimeout(function(){document.getElementById("phoneme").play();
       console.log("play sound")}, 900)
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
  } else if (this.state.totalCorrect === 19){
    setTimeout(function(){document.getElementById("twentyRight").play();}, 1000)
  } else if (this.state.totalCorrect === 29){
    setTimeout(function(){document.getElementById("thirtyRight").play();}, 1000)
  } else if (this.state.totalCorrect === 39){
    setTimeout(function(){document.getElementById("fortyRight").play();}, 1000)
  } else if (this.state.totalCorrect === 49){
    setTimeout(function(){document.getElementById("fiftyRight").play();}, 1000)
  }
  }

}
