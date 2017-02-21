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

  onClick() {
    document.getElementById("phoneme").play()
  }

  render() {
    return (
      <div>
          <i className="fa fa-play" aria-hidden="true" onClick={this.onClick}></i>

          <audio id="phoneme">
            <source src={this.props.src} />
          </audio>

      </div>
    );
  }
}
