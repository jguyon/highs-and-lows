// @flow

import * as React from "react";
import Home from "./Home";
import About from "./About";
import Game from "./Game";

const HIGH_SCORE_KEY = "highScore";

const getHighScore = () => {
  const highScore = parseInt(localStorage.getItem(HIGH_SCORE_KEY));
  return isNaN(highScore) ? null : highScore;
};

const setHighScore = (score: number) => {
  try {
    localStorage.setItem(HIGH_SCORE_KEY, score.toString());
    return true;
  } catch (error) {
    console.error("Failed to save high score:", error);
    return false;
  }
};

type AppState = {|
  page: "home" | "about" | "game",
  highScore: ?number
|};

class App extends React.Component<{||}, AppState> {
  state = {
    page: "home",
    highScore: getHighScore()
  };

  handlePlay = () => {
    this.setState({ page: "game" });
  };

  handleAbout = () => {
    this.setState({ page: "about" });
  };

  handleBack = () => {
    this.setState({ page: "home" });
  };

  handleNewHighScore = (score: number) => {
    if (setHighScore(score)) {
      this.setState({ highScore: score });
    }
  };

  render() {
    switch (this.state.page) {
      case "home":
        return (
          <Home
            highScore={this.state.highScore}
            onPlay={this.handlePlay}
            onAbout={this.handleAbout}
          />
        );

      case "about":
        return <About onBack={this.handleBack} />;

      case "game":
        return (
          <Game
            highScore={this.state.highScore}
            onNewHighScore={this.handleNewHighScore}
            onBack={this.handleBack}
          />
        );

      default:
        throw new Error(`invalid page: ${this.state.page}`);
    }
  }
}

export default App;
