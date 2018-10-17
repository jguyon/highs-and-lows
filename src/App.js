import React from "react";
import Home from "./Home";
import About from "./About";
import Game from "./Game";

const HIGH_SCORE_KEY = "highScore";

const getHighScore = () => {
  const highScore = parseInt(localStorage.getItem(HIGH_SCORE_KEY));
  return isNaN(highScore) ? null : highScore;
};

const setHighScore = score => {
  try {
    localStorage.setItem(HIGH_SCORE_KEY, score.toString());
    return true;
  } catch (error) {
    console.error("Failed to save high score:", error);
    return false;
  }
};

const PAGE_HOME = "HOME";
const PAGE_ABOUT = "ABOUT";
const PAGE_GAME = "GAME";

class App extends React.Component {
  state = {
    page: PAGE_HOME,
    highScore: getHighScore()
  };

  handlePlay = () => {
    this.setState({ page: PAGE_GAME });
  };

  handleAbout = () => {
    this.setState({ page: PAGE_ABOUT });
  };

  handleBack = () => {
    this.setState({ page: PAGE_HOME });
  };

  handleNewHighScore = score => {
    if (setHighScore(score)) {
      this.setState({ highScore: score });
    }
  };

  render() {
    if (this.state.page === PAGE_HOME) {
      return <Home onPlay={this.handlePlay} onAbout={this.handleAbout} />;
    } else if (this.state.page === PAGE_ABOUT) {
      return <About onBack={this.handleBack} />;
    } else if (this.state.page === PAGE_GAME) {
      return (
        <Game
          highScore={this.state.highScore}
          onNewHighScore={this.handleNewHighScore}
          onBack={this.handleBack}
        />
      );
    }
  }
}

export default App;
