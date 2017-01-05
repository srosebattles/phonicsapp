import React, { PropTypes, Component } from 'react';
import ItemTypes from './ItemTypes';
import { DropTarget } from 'react-dnd';

const style = {
  height: '12rem',
  width: '12rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
};

const boxTarget = {
  drop() {
    return { name: 'TargetBin' };
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }
}

class TargetBin extends Component {

  render() {
    const { canDrop, isOver, connectDropTarget, lastDroppedItem } = this.props;
    const isActive = canDrop && isOver;

    let backgroundColor = '#222';
    if (isActive) {
      backgroundColor = 'darkgreen';
    } else if (canDrop) {
      backgroundColor = 'darkkhaki';
    }

    return connectDropTarget(
      <div style={{ ...style, backgroundColor }}>
        {isActive ?
          'Release to drop' :
          'Drag a box here'
        }

        {lastDroppedItem &&
          <p>'Last dropped:' {JSON.stringify(lastDroppedItem)}</p>
        }
      </div>
    );
  }
}

TargetBin.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
  lastDroppedItem: PropTypes.object,
};

export default DropTarget(ItemTypes.BOX, boxTarget, collect)(TargetBin)
