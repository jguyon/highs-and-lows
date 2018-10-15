import React from "react";
import PropTypes from "prop-types";
import { Root, Card, CardTitle, Row, RowBtn } from "../Page";

const STATUS_COUNTING = "COUNTING";
const STATUS_FINISHED = "FINISHED";

class CountDown extends React.Component {
  static propTypes = {
    onBack: PropTypes.func.isRequired,
    onFinish: PropTypes.func.isRequired
  };

  state = {
    status: STATUS_COUNTING,
    remaining: 3
  };

  componentDidMount() {
    const updater = ({ status, remaining }) => {
      if (status === STATUS_COUNTING) {
        if (remaining > 1) {
          return { remaining: remaining - 1 };
        } else {
          return { status: STATUS_FINISHED };
        }
      }
    };

    const callback = () => {
      if (this.state.status === STATUS_FINISHED) {
        clearInterval(this.intervalId);
        this.intervalId = null;

        this.props.onFinish();
      }
    };

    this.intervalId = setInterval(() => {
      this.setState(updater, callback);
    }, 1000);
  }

  componentWillUnmount() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
    }
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
