import React from "react";
import PropTypes from "prop-types";
import { Root, Card, CardTitle, Row, RowBtn } from "./Page";

const About = ({ onBack }) => (
  <Root>
    <Card>
      <CardTitle>to be written</CardTitle>
    </Card>
    <Row onClick={onBack}>
      <RowBtn onClick={onBack}>BACK</RowBtn>
    </Row>
  </Root>
);

About.propTypes = {
  onBack: PropTypes.func
};

export default About;
