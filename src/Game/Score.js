import React from "react";
import PropTypes from "prop-types";
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

const renderCards = cardCount => (cardCount === 1 ? "card" : "cards");

const renderCount = count => (count > 0 ? `+${count}` : `${count}`);

const renderSubTitle = (result, prevHighScore, realCount, userCount) => {
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

const Score = ({
  result,
  prevHighScore,
  drawnCards,
  realCount,
  userCount,
  onBack
}) => (
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

Score.propTypes = {
  result: PropTypes.oneOf(["won", "lost", "highscore"]).isRequired,
  prevHighScore: PropTypes.number,
  drawnCards: PropTypes.number.isRequired,
  realCount: PropTypes.number.isRequired,
  userCount: PropTypes.number.isRequired,
  onBack: PropTypes.func.isRequired
};

export default Score;
