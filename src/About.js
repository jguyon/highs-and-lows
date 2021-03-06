// @flow

import * as React from "react";
import { GAME_DURATION_SECONDS } from "./constants";
import { Root, Card, CardText, Row, RowBtn, Link } from "./Page";

type AboutProps = {|
  onBack: () => void
|};

const About = ({ onBack }: AboutProps) => (
  <Root>
    <Card>
      <CardText>
        This game is inspired by the hi-lo method of counting cards in
        blackjack.
        <br />
        The goal is to keep a running count in your head. It starts at zero.
      </CardText>
      <CardText>
        For each card, add one to the count if its rank is 2, 3, 4, 5 or 6,
        substract one if it is 10, J, Q, K or A and leave the count alone for 7,
        8 or 9. Suits don't matter.
      </CardText>
      <CardText>
        Tap each card to draw the next one.
        <br />
        After {GAME_DURATION_SECONDS} seconds, you will be asked for the count.
        Did you get it right? :)
      </CardText>
      <CardText>
        The source code is available on{" "}
        <Link href="https://github.com/jguyon/highs-and-lows">GitHub</Link>.
        <br />
        All icons were adapted from works by{" "}
        <Link href="https://www.flaticon.com/authors/smashicons">
          Smashicons
        </Link>{" "}
        from <Link href="https://www.flaticon.com/">www.flaticon.com</Link>.
      </CardText>
    </Card>
    <Row onClick={onBack}>
      <RowBtn onClick={onBack}>BACK</RowBtn>
    </Row>
  </Root>
);

export default About;
