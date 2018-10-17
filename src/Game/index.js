import React from "react";
import PropTypes from "prop-types";
import CountDown from "./CountDown";
import Play from "./Play";
import AskForCount from "./AskForCount";
import Score from "./Score";

const PHASE_COUNTDOWN = "COUNTDOWN";
const PHASE_PLAY = "PLAY";
const PHASE_ASKING_FOR_COUNT = "ASKING_FOR_COUNT";
const PHASE_SCORING = "SCORING";

class Game extends React.Component {
  static propTypes = {
    onBack: PropTypes.func.isRequired
  };

  state = {
    phase: PHASE_COUNTDOWN,
    drawnCards: null,
    realCount: null,
    result: null
  };

  handleCountDownFinish = () => {
    this.setState({ phase: PHASE_PLAY });
  };

  handlePlayFinish = ({ drawnCards, count: realCount }) => {
    this.setState({
      phase: PHASE_ASKING_FOR_COUNT,
      drawnCards,
      realCount
    });
  };

  handleAskForCountFinish = userCount => {
    this.setState(({ realCount }) => ({
      phase: PHASE_SCORING,
      result: userCount === realCount ? "won" : "lost"
    }));
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
    } else if (this.state.phase === PHASE_ASKING_FOR_COUNT) {
      return <AskForCount onFinish={this.handleAskForCountFinish} />;
    } else if (this.state.phase === PHASE_SCORING) {
      return (
        <Score
          result={this.state.result}
          drawnCards={this.state.drawnCards}
          realCount={this.state.realCount}
          onBack={this.props.onBack}
        />
      );
    }
  }
}

export default Game;
