import cardUnicodes from "./cardUnicodes.js";
import React from "react";

import "./game.css";

import Game from "./model/game";
import { cardValues } from "./model/constants.js";

const GAP_BETWEEN_CARD_OVERLAP = 8;
const CARD_HEIGHT = 19;

function Card(props) {
  let color = props.color || "black";
  let top = props.top || 0;
  let height = props.height || CARD_HEIGHT;
  top += "vh";
  height += "vh";
  let draggable = props.draggable == undefined || props.draggable == true;
  return (
    <div
      className={"card " + props.className}
      draggable={draggable}
      onDragStart={props.onDragStart}
      onClick={props.onClick}
      style={{ color, top, height }}
    >
      {props.Unicode}
    </div>
  );
}

const createPileCard = function(card, onCardDragStart, key, { top, height }) {
  let unicode = cardUnicodes["BACK"][0];
  let draggable = false;
  let color = "black";
  if (!card.isFacingDown()) {
    unicode = getUnicode(card);
    draggable = true;
    color = card.color;
  }
  return (
    <Card
      Unicode={unicode}
      color={color}
      className="pile-card"
      key={key++}
      top={top}
      onDragStart={onCardDragStart}
      draggable={draggable}
      height={height}
    />
  );
};

function Pile(props) {
  let key = 1;
  let top = -GAP_BETWEEN_CARD_OVERLAP;
  let height = props.cards.length * GAP_BETWEEN_CARD_OVERLAP + CARD_HEIGHT;
  return (
    <div
      className="pile"
      id={props.id}
      onDragOver={de => de.preventDefault()}
      onDrop={props.onCardDrop}
    >
      {props.cards.map(card => {
        top += GAP_BETWEEN_CARD_OVERLAP;
        height -= GAP_BETWEEN_CARD_OVERLAP;
        return createPileCard(card, props.onCardDragStart, key, {
          top,
          height
        });
      })}
    </div>
  );
}

function ReservedDeck(props) {
  let key = 1;
  return (
    <div
      className="reserved-deck"
      onDragOver={de => de.preventDefault()}
      onDrop={props.onCardDrop}
      id={props.id}
    >
      {props.cards.map(card => (
        <Card
          Unicode={getUnicode(card)}
          onDragStart={props.onCardDragStart}
          color={card.color}
          key={key++}
        />
      ))}
    </div>
  );
}

class GameComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = new Game();
    this.state.setup();
  }

  cardDragStart(dragEvent) {
    const containerDiv = dragEvent.currentTarget.parentElement;
    const containerCategory = containerDiv.parentElement.id;
    if (containerCategory == "deck") {
      this.state.draggingCardContainer = this.state[containerCategory];
      return;
    }
    this.state.draggingCardContainer = this.state[containerCategory][
      containerDiv.id - 1
    ];
  }

  cardDrop(dragEvent) {
    const droppingContainerDiv = dragEvent.currentTarget;
    const droppingContainerCategory = droppingContainerDiv.parentElement.id;
    const dropingContainer = this.state[droppingContainerCategory][
      droppingContainerDiv.id - 1
    ];
    const isDropped = dropingContainer.addCard(
      this.state.draggingCardContainer.getActiveCard()
    );
    if (isDropped) {
      this.state.draggingCardContainer.takeCard().faceUp();
      this.setState(this.state);
    }
  }

  changeActiveCard() {
    this.state.deck.changeActiveCard();
    this.setState(this.state);
  }

  generateReservedDeckDivs() {
    let reservedDeckDivs = [];
    let key = 1;
    for (let reservedDeck of this.state.reservedDecks) {
      let div = (
        <ReservedDeck
          cards={reservedDeck.cards}
          id={key}
          key={key++}
          onCardDrop={this.cardDrop.bind(this)}
          onCardDragStart={this.cardDragStart.bind(this)}
        />
      );
      reservedDeckDivs.push(div);
    }
    return reservedDeckDivs;
  }

  generatePileDivs() {
    let pileDivs = [];
    let key = 1;
    for (let pile of this.state.piles) {
      let div = (
        <Pile
          cards={pile.cards}
          id={key}
          key={key++}
          onCardDragStart={this.cardDragStart.bind(this)}
          onCardDrop={this.cardDrop.bind(this)}
        />
      );
      pileDivs.push(div);
    }
    return pileDivs;
  }

  render() {
    let activeCard = this.state.deck.getActiveCard();

    let reservedDeckDivs = this.generateReservedDeckDivs();
    let pileDivs = this.generatePileDivs();
    return (
      <div className="game">
        <div className="horizontal-layer">
          <div className="deck" id="deck">
            <div>
              <Card
                Unicode={cardUnicodes["BACK"][0]}
                draggable={false}
                onClick={this.changeActiveCard.bind(this)}
                key="1"
              />
            </div>
            <div>
              <Card
                onDragStart={this.onDragStart}
                Unicode={getUnicode(activeCard)}
                draggable={true}
                color={activeCard.color}
                onDragStart={this.cardDragStart.bind(this)}
                key="2"
              />
            </div>
          </div>

          <div className="deck" id="reservedDecks">
            {reservedDeckDivs}
          </div>
        </div>

        <div className="horizontal-layer tableau">
          <div className="piles" id="piles">
            {pileDivs}
          </div>
        </div>
      </div>
    );
  }
}
function getUnicode(card) {
  let cardValue = cardValues.indexOf(card.value);
  let cardUnicode = cardUnicodes[card.cardType][cardValue];
  return cardUnicode;
}

export default GameComponent;
