import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TargetBin from './TargetBin';
import Box from './Box';
import update from 'react/lib/update';

class ExampleContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      targetbins: [
        { lastDroppedItem: null }
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
            <Box  name={name}
                  isDropped={this.isDropped(name)}
                  key={index} />
             )}
        </div>
      </div>
    );
  }

  handleDrop(index, item) {
  const { name } = item;

  this.setState(update(this.state, {
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
  }));
}
}

export default DragDropContext(HTML5Backend)(ExampleContainer);
