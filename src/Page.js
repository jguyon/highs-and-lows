import React from "react";
import styles from "./Page.module.css";
import PropTypes from "prop-types";

const Root = ({ children }) => (
  <div className={[styles["root"], styles["column"], styles["pad"]].join(" ")}>
    {children}
  </div>
);

Root.propTypes = {
  children: PropTypes.node
};

const Spades = () => <>&spades;</>;

const Hearts = () => <>&hearts;</>;

const Clubs = () => <>&clubs;</>;

const Diamonds = () => <>&diams;</>;

const CardRoot = ({ isRed, onClick, children }) => {
  const classes = [
    styles["column__item"],
    styles["column__item--grow"],
    styles["column"],
    styles["box"],
    isRed ? styles["box--red"] : styles["box--black"],
    styles["pad"],
    styles["quadrant"]
  ];

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={[
          ...classes,
          styles["button-reset"],
          styles["box--clickable"]
        ].join(" ")}
      >
        {children}
      </button>
    );
  } else {
    return <div className={classes.join(" ")}>{children}</div>;
  }
};

const CardCorner = ({ direction, children }) => (
  <div
    className={[
      styles["quadrant__corner"],
      styles[`quadrant__corner--${direction}`],
      styles["pad"],
      styles["big"]
    ].join(" ")}
  >
    {children}
  </div>
);

const Card = ({ suit, onClick, children }) => {
  const isRed = suit === "hearts" || suit === "diamonds";

  let corner = null;
  if (suit === "spades") {
    corner = <Spades />;
  } else if (suit === "hearts") {
    corner = <Hearts />;
  } else if (suit === "clubs") {
    corner = <Clubs />;
  } else if (suit === "diamonds") {
    corner = <Diamonds />;
  }

  return (
    <CardRoot isRed={isRed} onClick={onClick}>
      {corner === null ? null : (
        <>
          <CardCorner direction="tl">{corner}</CardCorner>
          <CardCorner direction="tr">{corner}</CardCorner>
          <CardCorner direction="br">{corner}</CardCorner>
          <CardCorner direction="bl">{corner}</CardCorner>
        </>
      )}
      {children}
    </CardRoot>
  );
};

Card.propTypes = {
  suit: PropTypes.oneOf(["spades", "hearts", "clubs", "diamonds"]),
  onClick: PropTypes.func,
  children: PropTypes.node
};

const CardTitle = ({ children }) => (
  <h1 className={[styles["column__item"], styles["big"]].join(" ")}>
    {children}
  </h1>
);

CardTitle.propTypes = {
  children: PropTypes.node
};

const Row = ({ children }) => (
  <div className={[styles["column__item"], styles["row"]].join(" ")}>
    {children}
  </div>
);

Row.propTypes = {
  children: PropTypes.node
};

const RowBtn = ({ onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={[
      styles["row__item"],
      styles["row__item--grow"],
      styles["button-reset"],
      styles["box"],
      styles["box--black"],
      styles["box--clickable"],
      styles["small-pad"]
    ].join(" ")}
  >
    {children}
  </button>
);

RowBtn.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node
};

export { Root, Card, CardTitle, Row, RowBtn };
