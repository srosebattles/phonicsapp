import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

const style = {
  fontSize: '100px',
  border: 'none',
  backgroundColor: 'whitesmoke',
  padding: '1rem 2rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  display: 'inline-flex',
  color: '#6115fb'
};

const boxSource = {
  beginDrag(props) {
    return {
      name: props.name,
      origin: props.origin
    };
  }

};

@DragSource(props => props.type, boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class Box extends Component {
  render() {
    const { name, isDragging, connectDragSource } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return connectDragSource(
      <div style={{ ...style, opacity }}>

          {name}

      </div>
    );
  }
}
