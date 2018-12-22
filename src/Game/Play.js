// @flow

import * as React from "react";
import { GAME_DURATION_SECONDS } from "../constants";
import { Root, Card, CardTitle, Row, RowBtn } from "../Page";
import type { Suit } from "../Page";

type Rank = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

const rankToText = (rank: Rank) => {
  switch (rank) {
    case 11:
      return "J";
    case 12:
      return "Q";
    case 13:
      return "K";
    case 14:
      return "A";
    default:
      return rank.toString();
  }
};

type PlayingCard = {|
  rank: Rank,
  suit: Suit
|};

const cardDeck: PlayingCard[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  .map(rank => [
    { rank, suit: "spades" },
    { rank, suit: "hearts" },
    { rank, suit: "diamonds" },
    { rank, suit: "clubs" }
  ])
  .reduce((cards, current) => [...cards, ...current], []);

const randomCard = () => {
  const index = Math.floor(Math.random() * cardDeck.length);
  return cardDeck[index];
};

const nextCount = (prevCount: number, { rank }: PlayingCard) => {
  if (rank < 7) {
    return prevCount + 1;
  } else if (rank > 9) {
    return prevCount - 1;
  } else {
    return prevCount;
  }
};

type PlayState = {|
  status: "playing" | "pending" | "finished",
  remaining: number,
  drawnCards: number,
  currentCard: PlayingCard,
  count: number
|};

const initialPlayState: PlayState = {
  status: "playing",
  remaining: GAME_DURATION_SECONDS,
  drawnCards: 0,
  currentCard: cardDeck[0],
  count: 0
};

type PlayActionTick = {|
  type: "tick"
|};

type PlayActionNextCard = {|
  type: "nextcard",
  nextCard: PlayingCard
|};

type PlayAction = PlayActionTick | PlayActionNextCard;

const playReducer = (state: PlayState, action: PlayAction): PlayState => {
  switch (action.type) {
    case "tick": {
      const { status, remaining } = state;

      if (status === "playing") {
        if (remaining > 1) {
          return { ...state, remaining: remaining - 1 };
        } else {
          return { ...state, status: "pending" };
        }
      } else if (status === "pending") {
        return { ...state, status: "finished" };
      } else {
        return state;
      }
    }

    case "nextcard": {
      const { nextCard } = action;
      const { status, drawnCards, count } = state;

      if (status === "playing") {
        return {
          ...state,
          drawnCards: drawnCards + 1,
          currentCard: nextCard,
          count: nextCount(count, nextCard)
        };
      } else {
        return state;
      }
    }

    default:
      throw new Error(`invalid action: ${action.type}`);
  }
};

type PlayProps = {|
  onBack: () => void,
  onFinish: ({| drawnCards: number, count: number |}) => void
|};

const Play = ({ onBack, onFinish }: PlayProps) => {
  const [state, dispatch] = React.useReducer(playReducer, initialPlayState, {
    type: "nextcard",
    nextCard: randomCard()
  });

  React.useEffect(
    () => {
      if (state.status === "playing" || state.status === "pending") {
        const id = setInterval(() => dispatch({ type: "tick" }), 1000);
        return () => clearInterval(id);
      } else if (state.status === "finished") {
        onFinish({
          drawnCards: state.drawnCards,
          count: state.count
        });
      }
    },
    [state.status === "playing" || state.status === "pending"]
  );

  const card = React.useMemo(
    () => (
      <Card
        isButton
        suit={state.currentCard.suit}
        disabled={state.status !== "playing"}
        onClick={() =>
          dispatch({
            type: "nextcard",
            nextCard: randomCard()
          })
        }
      >
        <CardTitle>{rankToText(state.currentCard.rank)}</CardTitle>
      </Card>
    ),
    [state.currentCard, state.status !== "playing"]
  );

  const row = React.useMemo(
    () => (
      <Row>
        <RowBtn onClick={onBack}>BACK</RowBtn>
      </Row>
    ),
    [onBack]
  );

  return (
    <Root>
      {card}
      {row}
    </Root>
  );
};

export default Play;
