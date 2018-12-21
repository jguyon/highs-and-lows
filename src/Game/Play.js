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

type PlayProps = {|
  onBack: () => void,
  onFinish: ({| drawnCards: number, count: number |}) => void
|};

type PlayState = {|
  status: "playing" | "pending" | "finished",
  remaining: number,
  drawnCards: number,
  currentCard: PlayingCard,
  count: number
|};

class Play extends React.Component<PlayProps, PlayState> {
  intervalId: null | IntervalID = null;

  constructor(props: PlayProps) {
    super(props);

    const currentCard = randomCard();
    const count = nextCount(0, currentCard);

    this.state = {
      status: "playing",
      remaining: GAME_DURATION_SECONDS,
      drawnCards: 1,
      currentCard,
      count
    };
  }

  clearInterval() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  componentDidMount() {
    const updater = ({ status, remaining }: PlayState) => {
      if (status === "playing") {
        if (remaining > 1) {
          return { remaining: remaining - 1 };
        } else {
          return { status: "pending" };
        }
      } else if (status === "pending") {
        return { status: "finished" };
      }
    };

    const callback = () => {
      if (this.state.status === "finished") {
        this.clearInterval();
        this.props.onFinish({
          drawnCards: this.state.drawnCards,
          count: this.state.count
        });
      }
    };

    this.intervalId = setInterval(() => {
      this.setState(updater, callback);
    }, 1000);
  }

  componentWillUnmount() {
    this.clearInterval();
  }

  handleCardClick = () => {
    const nextCard = randomCard();

    this.setState(({ status, drawnCards, count }) => {
      if (status === "playing") {
        return {
          drawnCards: drawnCards + 1,
          currentCard: nextCard,
          count: nextCount(count, nextCard)
        };
      }
    });
  };

  shouldComponentUpdate(nextProps: PlayProps, nextState: PlayState) {
    const { props: prevProps, state: prevState } = this;

    return (
      nextProps.onBack !== prevProps.onBack ||
      nextState.currentCard !== prevState.currentCard ||
      nextState.status !== prevState.status
    );
  }

  render() {
    return (
      <Root>
        <Card
          isButton
          suit={this.state.currentCard.suit}
          disabled={this.state.status !== "playing"}
          onClick={this.handleCardClick}
        >
          <CardTitle>{rankToText(this.state.currentCard.rank)}</CardTitle>
        </Card>
        <Row>
          <RowBtn onClick={this.props.onBack}>BACK</RowBtn>
        </Row>
      </Root>
    );
  }
}

export default Play;
