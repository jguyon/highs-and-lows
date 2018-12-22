// @flow

import * as React from "react";
import CountDown from "./CountDown";
import Play from "./Play";
import AskForCount from "./AskForCount";
import Score from "./Score";
import type { GameResult } from "./Score";

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

type Phase = PhaseCountDown | PhasePlay | PhaseAskForCount | PhaseScore;

type PhaseActionFinishCountDown = {|
  type: "finish-countdown"
|};

type PhaseActionFinishPlay = {|
  type: "finish-play",
  drawnCards: number,
  realCount: number
|};

type PhaseActionFinishAskForCount = {|
  type: "finish-askforcount",
  userCount: number
|};

type PhaseAction =
  | PhaseActionFinishCountDown
  | PhaseActionFinishPlay
  | PhaseActionFinishAskForCount;

const initialPhase: Phase = { type: "countdown" };

const makePhaseReducer = (highScore: ?number) => (
  phase: Phase,
  action: PhaseAction
): Phase => {
  switch (action.type) {
    case "finish-countdown":
      return {
        type: "play"
      };

    case "finish-play":
      const { drawnCards, realCount } = action;

      return {
        type: "askforcount",
        drawnCards,
        realCount
      };

    case "finish-askforcount":
      if (phase.type === "askforcount") {
        const { drawnCards, realCount } = phase;
        const { userCount } = action;

        let result: GameResult = "lost";
        if (userCount === realCount) {
          if (!highScore || drawnCards > highScore) {
            result = "highscore";
          } else {
            result = "won";
          }
        }

        return {
          type: "score",
          result,
          drawnCards,
          prevHighScore: highScore,
          realCount,
          userCount
        };
      } else {
        return phase;
      }

    default:
      throw new Error(`invalid action type: ${action.type}`);
  }
};

type GameProps = {|
  highScore: ?number,
  onNewHighScore: number => void,
  onBack: () => void
|};

const Game = ({ highScore, onNewHighScore, onBack }: GameProps) => {
  const [phase, phaseDispatch] = React.useReducer(
    makePhaseReducer(highScore),
    initialPhase
  );

  React.useEffect(
    () => {
      if (phase.type === "score" && phase.result === "highscore") {
        onNewHighScore(phase.drawnCards);
      }
    },
    [phase]
  );

  return React.useMemo(
    () => {
      switch (phase.type) {
        case "countdown":
          return (
            <CountDown
              onFinish={() => phaseDispatch({ type: "finish-countdown" })}
              onBack={onBack}
            />
          );

        case "play":
          return (
            <Play
              onFinish={({ drawnCards, count: realCount }) =>
                phaseDispatch({
                  type: "finish-play",
                  drawnCards,
                  realCount
                })
              }
              onBack={onBack}
            />
          );

        case "askforcount":
          return (
            <AskForCount
              onFinish={(userCount: number) =>
                phaseDispatch({
                  type: "finish-askforcount",
                  userCount
                })
              }
            />
          );

        case "score":
          const {
            result,
            prevHighScore,
            drawnCards,
            realCount,
            userCount
          } = phase;

          return (
            <Score
              result={result}
              prevHighScore={prevHighScore}
              drawnCards={drawnCards}
              realCount={realCount}
              userCount={userCount}
              onBack={onBack}
            />
          );

        default:
          throw new Error(`invalid phase type: ${phase.type}`);
      }
    },
    [phase, onBack]
  );
};

export default Game;
