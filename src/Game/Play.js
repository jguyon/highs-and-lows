import React from "react";
import PropTypes from "prop-types";
import { Root, Card, CardTitle, Row, RowBtn } from "../Page";

const RANK_TWO = 2;
const RANK_THREE = 3;
const RANK_FOUR = 4;
const RANK_FIVE = 5;
const RANK_SIX = 6;
const RANK_SEVEN = 7;
const RANK_EIGHT = 8;
const RANK_NINE = 9;
const RANK_TEN = 10;
const RANK_JACK = 11;
const RANK_QUEEN = 12;
const RANK_KING = 13;
const RANK_ACE = 14;

const rankToText = rank => {
  switch (rank) {
    case RANK_JACK:
      return "J";
    case RANK_QUEEN:
      return "Q";
    case RANK_KING:
      return "K";
    case RANK_ACE:
      return "A";
    default:
      return rank.toString();
  }
};

const SUIT_SPADES = "spades";
const SUIT_HEARTS = "hearts";
const SUIT_DIAMONDS = "diamonds";
const SUIT_CLUBS = "clubs";

const cardDeck = [
  RANK_TWO,
  RANK_THREE,
  RANK_FOUR,
  RANK_FIVE,
  RANK_SIX,
  RANK_SEVEN,
  RANK_EIGHT,
  RANK_NINE,
  RANK_TEN,
  RANK_JACK,
  RANK_QUEEN,
  RANK_KING,
  RANK_ACE
]
  .map(rank => [
    { rank, suit: SUIT_SPADES },
    { rank, suit: SUIT_HEARTS },
    { rank, suit: SUIT_DIAMONDS },
    { rank, suit: SUIT_CLUBS }
  ])
  .reduce((cards, current) => [...cards, ...current], []);

const randomCard = () => {
  const index = Math.floor(Math.random() * cardDeck.length);
  return cardDeck[index];
};

const nextCount = (prevCount, card) => {
  if (card.rank < RANK_SEVEN) {
    return prevCount + 1;
  } else if (card.rank > RANK_NINE) {
    return prevCount - 1;
  } else {
    return prevCount;
  }
};

const DURATION = process.env.NODE_ENV === "production" ? 21 : 5;

const STATUS_PLAYING = "PLAYING";
const STATUS_PENDING = "PENDING";
const STATUS_FINISHED = "FINISHED";

class Play extends React.Component {
  static propTypes = {
    onBack: PropTypes.func.isRequired,
    onFinish: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    const currentCard = randomCard();
    const count = nextCount(0, currentCard);

    this.state = {
      status: STATUS_PLAYING,
      remaining: DURATION,
      drawnCards: 1,
      currentCard,
      count
    };
  }

  componentDidMount() {
    const updater = ({ status, remaining }) => {
      if (status === STATUS_PLAYING) {
        if (remaining > 1) {
          return { remaining: remaining - 1 };
        } else {
          return { status: STATUS_PENDING };
        }
      } else if (status === STATUS_PENDING) {
        return { status: STATUS_FINISHED };
      }
    };

    const callback = () => {
      if (this.state.status === STATUS_FINISHED) {
        clearInterval(this.intervalId);
        this.intervalId = null;

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
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
    }
  }

  handleCardClick = () => {
    const nextCard = randomCard();

    this.setState(({ status, drawnCards, count }) => {
      if (status === STATUS_PLAYING) {
        return {
          drawnCards: drawnCards + 1,
          currentCard: nextCard,
          count: nextCount(count, nextCard)
        };
      }
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
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
          suit={this.state.currentCard.suit}
          onClick={
            this.state.status === STATUS_PLAYING ? this.handleCardClick : null
          }
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
