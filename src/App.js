import React from "react";
import Home from "./Home";
import About from "./About";
import Game from "./Game";

const PAGE_HOME = "HOME";
const PAGE_ABOUT = "ABOUT";
const PAGE_GAME = "GAME";

class App extends React.Component {
  state = { page: PAGE_HOME };

  handlePlay = () => {
    this.setState({ page: PAGE_GAME });
  };

  handleAbout = () => {
    this.setState({ page: PAGE_ABOUT });
  };

  handleBack = () => {
    this.setState({ page: PAGE_HOME });
  };

  render() {
    if (this.state.page === PAGE_HOME) {
      return <Home onPlay={this.handlePlay} onAbout={this.handleAbout} />;
    } else if (this.state.page === PAGE_ABOUT) {
      return <About onBack={this.handleBack} />;
    } else if (this.state.page === PAGE_GAME) {
      return <Game onBack={this.handleBack} />;
    }
  }
}

export default App;
