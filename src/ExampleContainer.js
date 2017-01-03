import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TargetBin from './TargetBin';
import Box from './Box';

class ExampleContainer extends Component {
  render() {
    return (
      <div>
        <div style={{ overflow: 'hidden', clear: 'both' }}>
          <TargetBin />
        </div>
        <div style={{ overflow: 'hidden', clear: 'both' }}>
          <Box name='s' />
          <Box name='a' />
          <Box name='t' />
          <Box name='i' />
          <Box name='p' />
          <Box name='n' />
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(ExampleContainer);
