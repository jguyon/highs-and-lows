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
    highScore: PropTypes.number,
    onNewHighScore: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired
  };

  state = {
    phase: {
      type: PHASE_COUNTDOWN
    }
  };

  handleCountDownFinish = () => {
    this.setState({
      phase: {
        type: PHASE_PLAY
      }
    });
  };

  handlePlayFinish = ({ drawnCards, count: realCount }) => {
    this.setState({
      phase: {
        type: PHASE_ASKING_FOR_COUNT,
        drawnCards,
        realCount
      }
    });
  };

  handleAskForCountFinish = userCount => {
    this.setState(
      ({ phase }, { highScore }) => {
        if (phase.type === PHASE_ASKING_FOR_COUNT) {
          let result = "lost";
          if (userCount === phase.realCount) {
            result =
              !highScore || phase.drawnCards > highScore ? "highscore" : "won";
          }

          return {
            phase: {
              type: PHASE_SCORING,
              result,
              prevHighScore: highScore,
              drawnCards: phase.drawnCards,
              realCount: phase.realCount,
              userCount
            }
          };
        }
      },
      () => {
        const { phase } = this.state;

        if (phase.type === PHASE_SCORING && phase.result === "highscore") {
          this.props.onNewHighScore(phase.drawnCards);
        }
      }
    );
  };

  shouldComponentUpdate(nextProps, nextState) {
    const { props: prevProps, state: prevState } = this;

    return (
      nextState.phase !== prevState.phase ||
      nextProps.onBack !== prevProps.onBack
    );
  }

  render() {
    const { phase } = this.state;
    const { onBack } = this.props;

    switch (phase.type) {
      case PHASE_COUNTDOWN:
        return (
          <CountDown onBack={onBack} onFinish={this.handleCountDownFinish} />
        );
      case PHASE_PLAY:
        return <Play onBack={onBack} onFinish={this.handlePlayFinish} />;
      case PHASE_ASKING_FOR_COUNT:
        return <AskForCount onFinish={this.handleAskForCountFinish} />;
      case PHASE_SCORING:
        return (
          <Score
            result={phase.result}
            prevHighScore={phase.prevHighScore}
            drawnCards={phase.drawnCards}
            realCount={phase.realCount}
            userCount={phase.userCount}
            onBack={onBack}
          />
        );
      default:
        throw new Error(`invalid phase type: ${phase.type}`);
    }
  }
}

export default Game;
