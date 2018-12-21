// @flow

import * as React from "react";
import { Root, Card, CardTitle, Row, RowBtn } from "../Page";

type AskForCountProps = {|
  onFinish: number => void
|};

type AskForCountState = {|
  count: number
|};

class AskForCount extends React.Component<AskForCountProps, AskForCountState> {
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
