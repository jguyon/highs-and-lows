// @flow

import * as React from "react";
import {
  Root,
  Card,
  CardTitle,
  CardSubTitle,
  Row,
  RowBtn,
  Green,
  Red,
  Gray
} from "../Page";

const renderCards = (cardCount: number) => (cardCount === 1 ? "card" : "cards");

const renderCount = (count: number) => (count > 0 ? `+${count}` : `${count}`);

export type GameResult = "highscore" | "won" | "lost";

const renderSubTitle = (
  result: GameResult,
  prevHighScore: ?number,
  realCount: number,
  userCount: number
) => {
  switch (result) {
    case "highscore":
      return (
        <CardSubTitle>
          new high score!
          {prevHighScore ? (
            <>
              <br />
              previous was <strong>{prevHighScore}</strong>{" "}
              {renderCards(prevHighScore)}
            </>
          ) : null}
        </CardSubTitle>
      );

    case "won":
      if (prevHighScore) {
        return (
          <CardSubTitle>
            high score is
            <br />
            <strong>{prevHighScore}</strong> {renderCards(prevHighScore)}
          </CardSubTitle>
        );
      } else {
        return null;
      }

    case "lost":
      return (
        <CardSubTitle>
          you guessed <strong>{renderCount(userCount)}</strong>
          <br />
          the count was <strong>{renderCount(realCount)}</strong>
        </CardSubTitle>
      );

    default:
      throw new Error(`invalid result: ${result}`);
  }
};

type ScoreProps = {|
  result: GameResult,
  prevHighScore: ?number,
  drawnCards: number,
  realCount: number,
  userCount: number,
  onBack: () => void
|};

const Score = ({
  result,
  prevHighScore,
  drawnCards,
  realCount,
  userCount,
  onBack
}: ScoreProps) => (
  <Root>
    <Card>
      <CardTitle>
        you counted
        <br />
        <Gray>{drawnCards}</Gray> {renderCards(drawnCards)}
        <br />
        {result === "lost" ? <Red>wrong :(</Red> : <Green>right :)</Green>}
      </CardTitle>
      {renderSubTitle(result, prevHighScore, realCount, userCount)}
    </Card>
    <Row>
      <RowBtn onClick={onBack}>BACK</RowBtn>
    </Row>
  </Root>
);

export default Score;
