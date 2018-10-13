import React from "react";
import PropTypes from "prop-types";
import { Root, Card, CardTitle, Row, RowBtn } from "./Page";

const Home = ({ onPlay, onAbout }) => (
  <Root>
    <Card>
      <CardTitle>
        highs
        <br />
        &amp;
        <br />
        lows
      </CardTitle>
    </Card>
    <Row>
      <RowBtn onClick={onPlay}>PLAY</RowBtn>
      <RowBtn onClick={onAbout}>ABOUT</RowBtn>
    </Row>
  </Root>
);

Home.propTypes = {
  onPlay: PropTypes.func,
  onAbout: PropTypes.func
};

export default Home;
