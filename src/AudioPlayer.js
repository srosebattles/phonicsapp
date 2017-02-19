import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class AudioPlayer extends Component {

  componentWillReceiveProps(nextProps) {
    // Find some DOM nodes
    const element = ReactDOM.findDOMNode(this);
    const audio = element.querySelector('audio');
    const source = audio.querySelector('source');

    // When the url changes, we refresh the component manually so it reloads the loaded file
    if ((nextProps.src) && (nextProps.src !== this.props.src)) {
      // Change the source
      source.src = nextProps.src;
      // Cause the audio element to load the new source
      audio.load();
    }
  }
  render() {
    return (
      <div>

        <button>
          <audio id="phoneme" controls>
            <source src={this.props.src} />
          </audio>
          ▸
        </button>

      </div>
    );
  }
}
