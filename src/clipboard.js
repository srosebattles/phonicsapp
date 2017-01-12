//Start with App.js

constructor() {
  super();
  this.state = {
    soundLink: "http://phonicsaudiofiles.s3.amazonaws.com/shortA.mp3"
  }
}

onChangeSound(e) {
  var uniqueRandomArray = require('unique-random-array')
  var chosenSound = uniqueRandomArray(["shortA.mp3", "soundS.mp3","soundT.mp3","shortI.mp3", "soundP.mp3","soundN.mp3"])
  console.log(chosenSound)
  var thisSound = chosenSound()
  console.log(thisSound)
  this.setState({
    soundLink: "http://phonicsaudiofiles.s3.amazonaws.com/" + thisSound
  })
}

//Next, Box.js


const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
};



function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class Box extends Component {


  render() {
    const { isDropped, isDragging, connectDragSource } = this.props;
    const { name, origin } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return connectDragSource(
        <div style={{ ...style, opacity }}>
          {name}
        </div>
    );
  }
}

Box.boxSource = {
    beginDrag(props) {
      return {
        name: props.name,
      };
    },

    endDrag(props, monitor) {
      const item = monitor.getItem();
      const dropResult = monitor.getDropResult();

      if (dropResult) {
        window.alert( // eslint-disable-line no-alert
          `You dropped ${item.name} into ${dropResult.name}!`
        );
        console.log(this.props)
        this.props.onDrop(item, dropResult)

      }
    }
  };

Box.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  origin: PropTypes.string.isRequired,
  isDropped: PropTypes.bool.isRequired
};

export default DragSource(ItemTypes.BOX, Box.boxSource, collect)(Box)

//Next, ExampleContainer.js

class ExampleContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      targetbins: [
        {accepts: [ItemTypes.BOX], lastDroppedItem: null }
      ],
      boxes: [
        { name: "s", type: 'box', origin: "http://phonicsaudiofiles.s3.amazonaws.com/soundS.mp3"  },
        { name: "a", type: 'box', origin: "http://phonicsaudiofiles.s3.amazonaws.com/shortA.mp3" },
        { name: "t", type: 'box', origin: "http://phonicsaudiofiles.s3.amazonaws.com/soundT.mp3" },
        { name: "i", type: 'box', origin: "http://phonicsaudiofiles.s3.amazonaws.com/shortI.mp3" },
        { name: "p", type: 'box', origin: "http://phonicsaudiofiles.s3.amazonaws.com/soundP.mp3" },
        { name: "n", type: 'box', origin: "http://phonicsaudiofiles.s3.amazonaws.com/soundN.mp3" }
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
              onDrop={(item) => this.handleDrop.bind(this, index, item)}
              key={index} />
            )}
        </div>
        <div style={{ overflow: 'hidden', clear: 'both' }}>
          {boxes.map(({ name, origin }, index) =>
            <Box name={name}
            onDrop={this.onDrop.bind(this, name, origin)}
                  key={index} />
             )}
        </div>
      </div>
    );
  }

  onDrop(name, origin){
    console.log(name)
    console.log(origin)
  }

  handleDrop(index, item) {
  const { name, origin } = item;
  console.log(item)
  this.setState(update(this.state,{
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

//Next, TarginBin.js


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
  drop(props, monitor) {
    props.onDrop(monitor.getItem());
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
