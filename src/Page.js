import React from "react";
import PropTypes from "prop-types";
import "./Page.css";

const Root = ({ children }) => <div className="page">{children}</div>;

Root.propTypes = {
  children: PropTypes.node
};

const Spades = () => <>&spades;</>;

const Hearts = () => <>&hearts;</>;

const Clubs = () => <>&clubs;</>;

const Diamonds = () => <>&diams;</>;

const CardRoot = ({ color, onClick, children }) => {
  const baseClassName = `page__item page__item--expand page__card page__card--${color}`;

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${baseClassName} page__card--clickable`}
      >
        {children}
      </button>
    );
  } else {
    return <div className={baseClassName}>{children}</div>;
  }
};

const CardCorner = ({ direction, children }) => (
  <div className={`page__card__corner page__card__corner--${direction}`}>
    {children}
  </div>
);

const Card = ({ suit, onClick, children }) => {
  const color = suit === "hearts" || suit === "diamonds" ? "red" : "black";

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
    <CardRoot color={color} onClick={onClick}>
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
  <h1 className="page__card__item page__title">{children}</h1>
);

CardTitle.propTypes = {
  children: PropTypes.node
};

const Row = ({ children }) => (
  <div className="page__item page__row">{children}</div>
);

Row.propTypes = {
  children: PropTypes.node
};

const RowBtn = ({ onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className="page__row__item page__button"
  >
    {children}
  </button>
);

RowBtn.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node
};

export { Root, Card, CardTitle, Row, RowBtn };
