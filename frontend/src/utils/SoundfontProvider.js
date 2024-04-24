import React from 'react';
import PropTypes from 'prop-types';
import Soundfont from 'soundfont-player';

class SoundfontProvider extends React.Component {
  static propTypes = {
    instrumentName: PropTypes.string.isRequired,
    hostname: PropTypes.string,
    format: PropTypes.oneOf(['mp3', 'ogg']),
    soundfont: PropTypes.oneOf(['MusyngKite', 'FluidR3_GM']),
    audioContext: PropTypes.instanceOf(window.AudioContext),
    render: PropTypes.func,
  };

  static defaultProps = {
    format: 'mp3',
    soundfont: 'MusyngKite',
    instrumentName: 'acoustic_grand_piano',
  };

  constructor(props) {
    super(props);
    this.state = {
      activeNotes: {},
    };
  }

  componentDidMount() {
    this.loadInstrument(this.props.instrumentName);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.instrumentName !== this.props.instrumentName) {
      this.loadInstrument(this.props.instrumentName);
    }
  }

  loadInstrument = instrumentName => {
    // Re-trigger loading state
    this.setState({
      instrument: null,
    });
    Soundfont.instrument(this.props.audioContext, instrumentName, {
      format: this.props.format,
      soundfont: this.props.soundfont,
      nameToUrl: (name, soundfont, format) => {
        return `${this.props.hostname}/${soundfont}/${name}-${format}.js`;
      },
    }).then(instrument => {
      this.setState({
        instrument,
      });
    });
  };

  render() {
    return this.props.render({
      isLoading: !this.state.instrument,
      playNote: (midiNumber) => {
        if (this.state.instrument) {
          // Create a new player for the note
          const player = this.state.instrument.play(midiNumber);
          // Add the player to the active notes map
          this.setState((prevState) => ({
            activeNotes: {
              ...prevState.activeNotes,
              [midiNumber]: player,
            },
          }));
        }
      },
      stopNote: (midiNumber) => {
        if (this.state.instrument) {
          // Stop the player for the note
          const player = this.state.activeNotes[midiNumber];
          if (player) {
            player.stop();
          }
          // Remove the player from the active notes map
          this.setState((prevState) => {
            const activeNotes = { ...prevState.activeNotes };
            delete activeNotes[midiNumber];
            return { activeNotes };
          });
        }
      },
    });
  }
}

export default SoundfontProvider;