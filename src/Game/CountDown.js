// @flow

import * as React from "react";
import { Root, Card, CardTitle, Row, RowBtn } from "../Page";

type CountDownProps = {|
  onBack: () => void,
  onFinish: () => void
|};

type CountDownState = {|
  status: "counting" | "finished",
  remaining: number
|};

class CountDown extends React.Component<CountDownProps, CountDownState> {
  intervalId: null | IntervalID = null;

  state = {
    status: "counting",
    remaining: 3
  };

  clearInterval() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  componentDidMount() {
    const updater = ({ status, remaining }: CountDownState) => {
      if (status === "counting") {
        if (remaining > 1) {
          return { remaining: remaining - 1 };
        } else {
          return { status: "finished" };
        }
      }
    };

    const callback = () => {
      if (this.state.status === "finished") {
        this.clearInterval();
        this.props.onFinish();
      }
    };

    this.intervalId = setInterval(() => {
      this.setState(updater, callback);
    }, 1000);
  }

  componentWillUnmount() {
    this.clearInterval();
  }

  render() {
    return (
      <Root>
        <Card>
          <CardTitle>{this.state.remaining}</CardTitle>
        </Card>
        <Row>
          <RowBtn onClick={this.props.onBack}>BACK</RowBtn>
        </Row>
      </Root>
    );
  }
}

export default CountDown;
