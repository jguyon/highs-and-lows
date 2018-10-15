import React from "react";
import PropTypes from "prop-types";
import { Root, Card, CardTitle, Row, RowBtn } from "../Page";

const Score = ({ userCount, realCount, onBack }) => (
  <Root>
    <Card>
      <CardTitle>
        {userCount === realCount ? "you counted right" : "you counted wrong"}
      </CardTitle>
    </Card>
    <Row>
      <RowBtn onClick={onBack}>BACK</RowBtn>
    </Row>
  </Root>
);

Score.propTypes = {
  userCount: PropTypes.number.isRequired,
  realCount: PropTypes.number.isRequired,
  onBack: PropTypes.func.isRequired
};

export default Score;
