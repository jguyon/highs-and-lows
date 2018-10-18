import React from "react";
import PropTypes from "prop-types";
import { Root, Card, CardTitle, CardSubTitle, Row, RowBtn } from "./Page";

const Home = ({ highScore, onPlay, onAbout }) => (
  <Root>
    <Card>
      <CardTitle>
        highs
        <br />
        &amp;
        <br />
        lows
      </CardTitle>
      {highScore ? (
        <CardSubTitle>
          high score is
          <br />
          <strong>{highScore}</strong> {highScore === 1 ? "card" : "cards"}
        </CardSubTitle>
      ) : null}
    </Card>
    <Row>
      <RowBtn onClick={onPlay}>PLAY</RowBtn>
      <RowBtn onClick={onAbout}>ABOUT</RowBtn>
    </Row>
  </Root>
);

Home.propTypes = {
  highScore: PropTypes.number,
  onPlay: PropTypes.func.isRequired,
  onAbout: PropTypes.func.isRequired
};

export default Home;
