import cardUnicodes from "./cardUnicodes.js";
import React from "react";


import "./game.css";

import Game from "./model/game";
import { cardValues } from "./model/constants.js";

function Card(props) {
  let color = props.color || "black";
  return (
    <div className="card" style={{ color }}>
      {props.Unicode}
    </div>
  );
}

function Pile(props) {
  return (
    <div className="pile">
      {props.cards.map(card => {
        if (card.isFacingDown())
          return <Card Unicode={cardUnicodes["BACK"][0]} />;
        return <Card Unicode={getUnicode(card)} color={card.color} />;
      })}
    </div>
  );
}

function ReservedDeck(props) {
  return (
    <div className="reserved-deck">
      {props.cards.map(card => (
        <Card Unicode={getUnicode(card)} />
      ))}
    </div>
  );
}

class GameComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { game: new Game() };
    this.state.game.setup();
  }

  render() {
    let { game } = this.state;
    let activeCard = game.deck.getActiveCard();
    return (
      <div className="game">
        <div className="horizontal-layer">
          <div className="deck">
            <Card
              Unicode={cardUnicodes["BACK"][0]}
              onClick={game.deck.changeActiveCard.bind(game.deck)}
              key="1"
            />
            <Card Unicode={getUnicode(activeCard)} key="2" />
          </div>
          <div className="deck">
            <ReservedDeck cards={game.reservedDecks[0].cards} key="1" />
            <ReservedDeck cards={game.reservedDecks[1].cards} key="2" />
            <ReservedDeck cards={game.reservedDecks[2].cards} key="3" />
            <ReservedDeck cards={game.reservedDecks[3].cards} key="4" />
          </div>
        </div>
        <div className="horizontal-layer">
          <div className="piles">
            <Pile cards={game.piles[0].cards} key="1" />
            <Pile cards={game.piles[1].cards} key="2" />
            <Pile cards={game.piles[2].cards} key="3" />
            <Pile cards={game.piles[3].cards} key="4" />
            <Pile cards={game.piles[4].cards} key="5" />
            <Pile cards={game.piles[5].cards} key="6" />
            <Pile cards={game.piles[6].cards} key="7" />
          </div>
        </div>
      </div>
    );
  }
}
function getUnicode(card) {
  let cardValue = cardValues.indexOf(card.value);
  let cardUnicode = cardUnicodes[card.cardType][cardValue + 1];
  return cardUnicode;
}

export default GameComponent;
