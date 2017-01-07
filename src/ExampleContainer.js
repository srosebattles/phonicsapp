import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TargetBin from './TargetBin';
import Box from './Box';
import ItemTypes from './ItemTypes'
import update from 'react/lib/update';

class ExampleContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      targetbins: [
        {accepts: [ItemTypes.BOX], lastDroppedItem: null }
      ],
      boxes: [
        { name: "s" },
        { name: "a" },
        { name: "t" },
        { name: "i" },
        { name: "p" },
        { name: "n" }
      ],
      droppedBoxNames: []
    }
  }
  render() {
    const {boxes, targetbins} = this.state
    return (
      <div>
        <div style={{ overflow: 'hidden', clear: 'both' }}>
        {targetbins.map(({ lastDroppedItem }, index) =>
          <TargetBin
              lastDroppedItem={lastDroppedItem}
              onDrop={(item) => this.handleDrop(index, item)}
              key={index} />
            )}
        </div>
        <div style={{ overflow: 'hidden', clear: 'both' }}>
          {boxes.map(({ name, type }, index) =>
            <Box name={name}
            //isDropped goes here
                  key={index} />
             )}
        </div>
      </div>
    );
  }

  handleDrop(index, item) {
  const { name } = item;

  this.setState({
    dustbins: {
      [index]: {
        lastDroppedItem: {
          $set: item
        }
      }
    },
    droppedBoxNames: name ? {
      $push: [name]
    } : {}
  });
  }
  }

export default DragDropContext(HTML5Backend)(ExampleContainer);
