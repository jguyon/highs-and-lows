import React from "react";
import PropTypes from "prop-types";
import { GAME_DURATION_SECONDS } from "./constants";
import { Root, Card, CardText, Row, RowBtn } from "./Page";

const About = ({ onBack }) => (
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
        Click or tap each card to draw the next one.
        <br />
        After {GAME_DURATION_SECONDS} seconds, you will be asked for the count.
        Did you get it right? :)
      </CardText>
      <CardText>
        Icons were adapted from works by{" "}
        <a href="https://www.flaticon.com/authors/smashicons">Smashicons</a>{" "}
        from <a href="https://www.flaticon.com/">www.flaticon.com</a>.
      </CardText>
    </Card>
    <Row onClick={onBack}>
      <RowBtn onClick={onBack}>BACK</RowBtn>
    </Row>
  </Root>
);

About.propTypes = {
  onBack: PropTypes.func.isRequired
};

export default About;
