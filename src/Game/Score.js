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

const Score = ({ result, prevHighScore, drawnCards, realCount, onBack }) => (
  <Root>
    <Card>
      <CardTitle>
        you counted
        <br />
        <Gray>{drawnCards}</Gray> {drawnCards === 1 ? "card" : "cards"}
        <br />
        {result === "lost" ? <Red>wrong :(</Red> : <Green>right :)</Green>}
      </CardTitle>
      {result === "lost" ? (
        <CardSubTitle>
          the count was{" "}
          <strong>{realCount > 0 ? `+${realCount}` : realCount}</strong>
        </CardSubTitle>
      ) : result === "highscore" ? (
        <CardSubTitle>
          new high score!
          {prevHighScore ? (
            <>
              <br />
              previous was <strong>{prevHighScore}</strong>{" "}
              {prevHighScore === 1 ? "card" : "cards"}
            </>
          ) : null}
        </CardSubTitle>
      ) : prevHighScore ? (
        <CardSubTitle>
          high score is
          <br />
          <strong>{prevHighScore}</strong>{" "}
          {prevHighScore === 1 ? "card" : "cards"}
        </CardSubTitle>
      ) : null}
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
  onBack: PropTypes.func.isRequired
};

export default Score;
