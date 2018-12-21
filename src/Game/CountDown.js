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

type CountDownAction = "tick";

const initialCountDownState: CountDownState = {
  status: "counting",
  remaining: 3
};

const countDownReducer = (
  state: CountDownState,
  action: CountDownAction
): CountDownState => {
  if (state.status === "counting") {
    if (state.remaining > 1) {
      return { ...state, remaining: state.remaining - 1 };
    } else {
      return { ...state, status: "finished" };
    }
  } else {
    return state;
  }
};

const CountDown = ({ onBack, onFinish }: CountDownProps) => {
  const [{ status, remaining }, dispatch] = React.useReducer(
    countDownReducer,
    initialCountDownState
  );

  React.useEffect(
    () => {
      switch (status) {
        case "counting":
          const id = setInterval(() => dispatch("tick"), 1000);
          return () => clearInterval(id);

        case "finished":
          onFinish();
          return;

        default:
          throw new Error(`invalid status: ${status}`);
      }
    },
    [status]
  );

  return (
    <Root>
      <Card>
        <CardTitle>{remaining}</CardTitle>
      </Card>
      <Row>
        <RowBtn onClick={onBack}>BACK</RowBtn>
      </Row>
    </Root>
  );
};

export default CountDown;
