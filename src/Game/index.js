import React from "react";
import PropTypes from "prop-types";
import { Root, Card, CardTitle, Row, RowBtn } from "../Page";

const Game = ({ onBack }) => (
  <Root>
    <Card>
      <CardTitle>to be written</CardTitle>
    </Card>
    <Row>
      <RowBtn onClick={onBack}>BACK</RowBtn>
    </Row>
  </Root>
);

Game.propTypes = {
  onBack: PropTypes.func
};

export default Game;
