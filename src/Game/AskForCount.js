// @flow

import * as React from "react";
import { Root, Card, CardTitle, Row, RowBtn } from "../Page";

type AskForCountProps = {|
  onFinish: number => void
|};

const AskForCount = ({ onFinish }: AskForCountProps) => {
  const [count, setCount] = React.useState(0);

  return (
    <Root>
      <Card>
        <CardTitle>{count > 0 ? `+${count}` : count}</CardTitle>
      </Card>
      <Row>
        <RowBtn onClick={() => setCount(count => count + 1)}>+</RowBtn>
        <RowBtn onClick={() => onFinish(count)}>OK</RowBtn>
        <RowBtn onClick={() => setCount(count => count - 1)}>-</RowBtn>
      </Row>
    </Root>
  );
};

export default AskForCount;
