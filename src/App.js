import React from "react";
import * as Page from "./Page";

const App = () => (
  <Page.Root>
    <Page.Card>
      <Page.CardTitle>
        highs
        <br />
        &amp;
        <br />
        lows
      </Page.CardTitle>
    </Page.Card>
    <Page.Row>
      <Page.RowBtn>PLAY</Page.RowBtn>
      <Page.RowBtn>ABOUT</Page.RowBtn>
    </Page.Row>
  </Page.Root>
);

export default App;
