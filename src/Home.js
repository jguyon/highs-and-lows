// @flow

import * as React from "react";
import { Root, Card, CardTitle, CardSubTitle, Row, RowBtn } from "./Page";

type HomeProps = {|
  highScore: ?number,
  onPlay: () => void,
  onAbout: () => void
|};

const Home = ({ highScore, onPlay, onAbout }: HomeProps) => (
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

export default Home;
