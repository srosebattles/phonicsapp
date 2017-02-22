import React, { PropTypes, Component } from 'react';
import { DropTarget } from 'react-dnd';

const style = {
  borderRadius: '20px',
  height: '15rem',
  width: '16rem',
  marginRight: '2rem',
  marginBottom: '2rem',
  color: 'whitesmoke',
  padding: '1rem',
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '12rem',
  lineHeight: 'normal',
  float: 'left',
  backgroundColor: '#6115fb',
};

const binTarget = {
  // How should we proceed when a component is dropped in this bin?
  drop(props, monitor) {
    // Call the dropped component's onDrop prop, passing it the item
    props.onDrop(monitor.getItem());
  }
};

// Tell react dnd that the TargetBin component is a target
// and pass it a config of what to do when something is dropped,
// what types to accept, etc.
@DropTarget(props => props.accepts, binTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))
export default class TargetBin extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    lastDroppedItem: PropTypes.object,
    onDrop: PropTypes.func.isRequired
};
  render() {
    const { isOver, canDrop, connectDropTarget, lastDroppedItem } = this.props;
    const isActive = isOver && canDrop;

    let backgroundColor = '#15fbae';
    if (isActive) {
      backgroundColor = '#1560FB';
    } else if (canDrop) {
      backgroundColor = '#1560FB';
    }

    return connectDropTarget(
      <div style={{ ...style, backgroundColor }}>
        {lastDroppedItem &&
          <p>{lastDroppedItem.name}</p>
        }
      </div>
    );
  }
}
