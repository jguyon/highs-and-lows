import React from "react";
import PropTypes from "prop-types";
import { Root, Card, CardTitle, Row, RowBtn } from "../Page";

class AskForCount extends React.Component {
  static propTypes = {
    onFinish: PropTypes.func.isRequired
  };

  state = { count: 0 };

  handleMinusClick = () => {
    this.setState(({ count }) => ({ count: count - 1 }));
  };

  handlePlusClick = () => {
    this.setState(({ count }) => ({ count: count + 1 }));
  };

  handleOkClick = () => {
    this.props.onFinish(this.state.count);
  };

  render() {
    return (
      <Root>
        <Card>
          <CardTitle>
            {this.state.count > 0 ? `+${this.state.count}` : this.state.count}
          </CardTitle>
        </Card>
        <Row>
          <RowBtn onClick={this.handlePlusClick}>+</RowBtn>
          <RowBtn onClick={this.handleOkClick}>OK</RowBtn>
          <RowBtn onClick={this.handleMinusClick}>-</RowBtn>
        </Row>
      </Root>
    );
  }
}

export default AskForCount;
