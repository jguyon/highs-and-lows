import React from "react";
import PropTypes from "prop-types";
import CountDown from "./CountDown";
import Play from "./Play";

const PHASE_COUNTDOWN = "COUNTDOWN";
const PHASE_PLAY = "PLAY";

class Game extends React.Component {
  static propTypes = {
    onBack: PropTypes.func.isRequired
  };

  state = {
    phase: PHASE_COUNTDOWN,
    realCount: null
  };

  handleCountDownFinish = () => {
    this.setState({ phase: PHASE_PLAY });
  };

  handlePlayFinish = realCount => {
    this.setState({ realCount });
  };

  render() {
    if (this.state.phase === PHASE_COUNTDOWN) {
      return (
        <CountDown
          onBack={this.props.onBack}
          onFinish={this.handleCountDownFinish}
        />
      );
    } else if (this.state.phase === PHASE_PLAY) {
      return (
        <Play onBack={this.props.onBack} onFinish={this.handlePlayFinish} />
      );
    }
  }
}

export default Game;
