import React from "react";
import PropTypes from "prop-types";
import { Root, Card, CardTitle, Row, RowBtn } from "../Page";

const Score = ({ drawnCards, userCount, realCount, onBack }) => (
  <Root>
    <Card>
      <CardTitle>
        you counted
        <br />
        {drawnCards} {drawnCards === 1 ? "card" : "cards"}
        <br />
        {userCount === realCount ? "right" : "wrong"}
      </CardTitle>
    </Card>
    <Row>
      <RowBtn onClick={onBack}>BACK</RowBtn>
    </Row>
  </Root>
);

Score.propTypes = {
  drawnCards: PropTypes.number.isRequired,
  userCount: PropTypes.number.isRequired,
  realCount: PropTypes.number.isRequired,
  onBack: PropTypes.func.isRequired
};

export default Score;
