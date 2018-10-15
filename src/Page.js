import React from "react";
import PropTypes from "prop-types";
import "./Page.css";

const Root = ({ children, ...props }) => (
  <div {...props} className="page">
    {children}
  </div>
);

const Spades = () => <>&spades;</>;

const Hearts = () => <>&hearts;</>;

const Clubs = () => <>&clubs;</>;

const Diamonds = () => <>&diams;</>;

const cardClassName = suit => {
  const color = suit === "hearts" || suit === "diamonds" ? "red" : "black";

  return `page__item page__item--expand page__card page__card--${color}`;
};

const cardCornerClassName = direction =>
  `page__card__corner page__card__corner--${direction}`;

const cardCorners = suit => {
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

  if (corner === null) {
    return null;
  } else {
    return (
      <>
        <div className={cardCornerClassName("tl")}>{corner}</div>
        <div className={cardCornerClassName("tr")}>{corner}</div>
        <div className={cardCornerClassName("br")}>{corner}</div>
        <div className={cardCornerClassName("bl")}>{corner}</div>
      </>
    );
  }
};

const Card = ({ isButton, suit, children, ...props }) => {
  if (isButton) {
    return (
      <button
        {...props}
        type="button"
        className={`${cardClassName(suit)} page__card--clickable`}
      >
        {cardCorners(suit)}
        {children}
      </button>
    );
  } else {
    return (
      <div {...props} className={cardClassName(suit)}>
        {cardCorners(suit)}
        {children}
      </div>
    );
  }
};

Card.propTypes = {
  isButton: PropTypes.bool,
  suit: PropTypes.oneOf(["spades", "hearts", "clubs", "diamonds"])
};

const CardTitle = ({ children, ...props }) => (
  <h1 {...props} className="page__card__item page__title">
    {children}
  </h1>
);

const CardText = ({ children, ...props }) => (
  <p {...props} className="page__card__item page__text">
    {children}
  </p>
);

const Row = ({ children, ...props }) => (
  <div {...props} className="page__item page__row">
    {children}
  </div>
);

const RowBtn = ({ children, ...props }) => (
  <button {...props} type="button" className="page__row__item page__button">
    {children}
  </button>
);

export { Root, Card, CardText, CardTitle, Row, RowBtn };
