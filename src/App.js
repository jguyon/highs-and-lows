// @flow

import * as React from "react";
import Home from "./Home";
import About from "./About";
import Game from "./Game";

const HIGH_SCORE_KEY = "highScore";

const getStorageHighScore = () => {
  const highScore = parseInt(localStorage.getItem(HIGH_SCORE_KEY));
  return isNaN(highScore) ? null : highScore;
};

const setStorageHighScore = (score: number) => {
  try {
    localStorage.setItem(HIGH_SCORE_KEY, score.toString());
    return true;
  } catch (error) {
    console.error("Failed to save high score:", error);
    return false;
  }
};

type PageState = "home" | "about" | "game";

const App = () => {
  const [page, setPage] = React.useState<PageState>("home");
  const [highScore, setHighScore] = React.useState(getStorageHighScore);

  switch (page) {
    case "home":
      return (
        <Home
          highScore={highScore}
          onPlay={() => setPage("game")}
          onAbout={() => setPage("about")}
        />
      );

    case "about":
      return <About onBack={() => setPage("home")} />;

    case "game":
      return (
        <Game
          highScore={highScore}
          onNewHighScore={score => {
            if (setStorageHighScore(score)) {
              setHighScore(score);
            }
          }}
          onBack={() => setPage("home")}
        />
      );

    default:
      throw new Error(`invalid page: ${page}`);
  }
};

export default App;
