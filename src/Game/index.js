import React from "react";
import PropTypes from "prop-types";
import CountDown from "./CountDown";

const Game = ({ onBack }) => <CountDown onBack={onBack} onFinish={() => {}} />;

Game.propTypes = {
  onBack: PropTypes.func.isRequired
};

export default Game;
