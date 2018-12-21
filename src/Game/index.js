// @flow

import * as React from "react";
import CountDown from "./CountDown";
import Play from "./Play";
import AskForCount from "./AskForCount";
import Score from "./Score";
import type { GameResult } from "./Score";

type GameProps = {|
  highScore: ?number,
  onNewHighScore: number => void,
  onBack: () => void
|};

type PhaseCountDown = {|
  type: "countdown"
|};

type PhasePlay = {|
  type: "play"
|};

type PhaseAskForCount = {|
  type: "askforcount",
  drawnCards: number,
  realCount: number
|};

type PhaseScore = {|
  type: "score",
  result: GameResult,
  prevHighScore: ?number,
  drawnCards: number,
  realCount: number,
  userCount: number
|};

type GameState = {|
  phase: PhaseCountDown | PhasePlay | PhaseAskForCount | PhaseScore
|};

class Game extends React.Component<GameProps, GameState> {
  state = {
    phase: {
      type: "countdown"
    }
  };

  handleCountDownFinish = () => {
    this.setState({
      phase: {
        type: "play"
      }
    });
  };

  handlePlayFinish = ({
    drawnCards,
    count: realCount
  }: {|
    drawnCards: number,
    count: number
  |}) => {
    this.setState({
      phase: {
        type: "askforcount",
        drawnCards,
        realCount
      }
    });
  };

  handleAskForCountFinish = (userCount: number) => {
    this.setState(
      ({ phase }, { highScore }) => {
        if (phase.type === "askforcount") {
          let result: GameResult = "lost";
          if (userCount === phase.realCount) {
            if (!highScore || phase.drawnCards > highScore) {
              result = "highscore";
            } else {
              result = "won";
            }
          }

          return {
            phase: {
              type: "score",
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

        if (phase.type === "score" && phase.result === "highscore") {
          this.props.onNewHighScore(phase.drawnCards);
        }
      }
    );
  };

  shouldComponentUpdate(nextProps: GameProps, nextState: GameState) {
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
      case "countdown":
        return (
          <CountDown onBack={onBack} onFinish={this.handleCountDownFinish} />
        );

      case "play":
        return <Play onBack={onBack} onFinish={this.handlePlayFinish} />;

      case "askforcount":
        return <AskForCount onFinish={this.handleAskForCountFinish} />;

      case "score":
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
