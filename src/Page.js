// @flow

import * as React from "react";
import "./Page.css";

type HTMLProps = {
  children?: React.Node
};

export const Root = ({ children, ...props }: HTMLProps) => (
  <div {...props} className="page">
    {children}
  </div>
);

const ICON_CLASS_NAME = "page__card__corner__icon";
const ICON_FILL_CLASS_NAME = "page__card__corner__icon__fill";

// https://www.flaticon.com/free-icon/spades_220760
const SPADES_ICON = (
  <svg className={ICON_CLASS_NAME} viewBox="0 0 511.96 511.96">
    <path
      className={ICON_FILL_CLASS_NAME}
      d="M302.728,390.351c16.49,15.934,26.368,25.759,55.905,24.541c43.494-1.783,83.871-25.459,106.364-62.729 c38.78-64.247,17.576-128.53-23.702-166.824L272.705,6.528c-9.507-8.704-24.082-8.704-33.589,0L68.073,185.34 c-40.13,37.226-57.256,99.037-23.729,161.483c21.283,39.645,61.767,66.357,106.726,68.087c29.281,1.121,40.801-8.66,57.759-24.488 c4.458-4.167,11.767-1.033,11.767,5.076l0.009,29.987c0,16.172-4.228,32.071-12.253,46.115l-15.519,27.154 c-3.354,5.888,0.892,13.206,7.671,13.206h110.813c6.78,0,11.034-7.318,7.671-13.206l-15.519-27.154 c-8.024-14.045-12.244-29.943-12.244-46.115v-30.296C291.226,389.213,298.429,386.202,302.728,390.351"
    />
  </svg>
);

// https://www.flaticon.com/free-icon/hearts_220759
const HEARTS_ICON = (
  <svg className={ICON_CLASS_NAME} viewBox="0 0 510.977 510.977">
    <path
      className={ICON_FILL_CLASS_NAME}
      d="M255.22,105.177c19.535-49.77,61.325-87.79,113.231-87.79c43.705,0,79.625,23.111,108.871,54.44 c38.859,41.622,56.17,137.216-15.863,209.24c-36.546,36.546-205.815,212.524-205.815,212.524S86.384,317.613,49.838,281.066 c-72.033-72.024-55.578-167.618-15.863-209.24c29.581-31.002,65.165-54.44,108.871-54.44 C194.751,17.386,235.685,55.407,255.22,105.177"
    />
  </svg>
);

// https://www.flaticon.com/free-icon/clubs_220757
const CLUBS_ICON = (
  <svg className={ICON_CLASS_NAME} viewBox="0 0 511.998 511.998">
    <path
      className={ICON_FILL_CLASS_NAME}
      d="M419.381,199.229c-26.651-12.378-51.541-12.674-74.177-7.186c18.441-21.827,29.058-50.472,27.396-81.642 C369.438,51,320.017,2.36,260.58,0.087c-66.578-2.542-121.353,50.67-121.353,116.682c0,28.699,10.393,54.937,27.567,75.273 c-22.636-5.488-47.526-5.192-74.177,7.186c-41.023,19.061-69.569,59.401-70.153,104.628 c-0.835,65.204,51.757,118.317,116.763,118.317c31.412,0,59.859-12.459,80.842-32.633v34.403c0,16.501-4.303,32.714-12.495,47.041 l-15.755,27.576c-3.422,5.991,0.907,13.438,7.797,13.438h112.766c6.899,0,11.219-7.446,7.797-13.438l-15.755-27.576 c-8.183-14.327-12.495-30.54-12.495-47.041V389.54c20.992,20.175,49.439,32.633,80.842,32.633 c65.006,0,117.607-53.113,116.763-118.317C488.95,258.629,460.403,218.289,419.381,199.229"
    />
  </svg>
);

// https://www.flaticon.com/free-icon/diamonds_220758
const DIAMONDS_ICON = (
  <svg className={ICON_CLASS_NAME} viewBox="0 0 512 512">
    <polygon
      className={ICON_FILL_CLASS_NAME}
      points="256,0 45.714,256 256,512 466.286,256"
    />
  </svg>
);

export type Suit = "spades" | "hearts" | "clubs" | "diamonds";

const cardClassName = (suit?: Suit) => {
  const baseClassName = `page__item page__item--expand page__card`;

  return suit === "hearts" || suit === "diamonds"
    ? `${baseClassName} page__red`
    : baseClassName;
};

const cardCornerClassName = (direction: "tl" | "tr" | "br" | "bl") =>
  `page__card__corner page__card__corner--${direction}`;

const renderCardCorners = (suit?: Suit) => {
  let corner = null;
  if (suit === "spades") {
    corner = SPADES_ICON;
  } else if (suit === "hearts") {
    corner = HEARTS_ICON;
  } else if (suit === "clubs") {
    corner = CLUBS_ICON;
  } else if (suit === "diamonds") {
    corner = DIAMONDS_ICON;
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

const renderCardMain = (children?: React.Node) => (
  <div className="page__card__main">{children}</div>
);

type CardProps = {
  isButton?: boolean,
  suit?: Suit,
  children?: React.Node
};

export const Card = ({ isButton, suit, children, ...props }: CardProps) => {
  if (isButton) {
    return (
      <button
        {...props}
        type="button"
        className={`${cardClassName(suit)} page__card--clickable`}
      >
        {renderCardCorners(suit)}
        {renderCardMain(children)}
      </button>
    );
  } else {
    return (
      <div {...props} className={cardClassName(suit)}>
        {renderCardCorners(suit)}
        {renderCardMain(children)}
      </div>
    );
  }
};

export const CardTitle = ({ children, ...props }: HTMLProps) => (
  <h1 {...props} className="page__card__main__item page__title">
    {children}
  </h1>
);

export const CardSubTitle = ({ children, ...props }: HTMLProps) => (
  <h2 {...props} className="page__card__main__item page__subtitle">
    {children}
  </h2>
);

export const CardText = ({ children, ...props }: HTMLProps) => (
  <p {...props} className="page__card__main__item page__text">
    {children}
  </p>
);

export const Row = ({ children, ...props }: HTMLProps) => (
  <div {...props} className="page__item page__row">
    {children}
  </div>
);

export const RowBtn = ({ children, ...props }: HTMLProps) => (
  <button {...props} type="button" className="page__row__item page__button">
    {children}
  </button>
);

export const Link = ({ children, ...props }: HTMLProps) => (
  <a {...props} className="page__link">
    {children}
  </a>
);

export const Green = ({ children, ...props }: HTMLProps) => (
  <span {...props} className="page__green">
    {children}
  </span>
);

export const Red = ({ children, ...props }: HTMLProps) => (
  <span {...props} className="page__red">
    {children}
  </span>
);

export const Gray = ({ children, ...props }: HTMLProps) => (
  <span {...props} className="page__gray">
    {children}
  </span>
);
