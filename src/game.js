import cardUnicodes from "./cardUnicodes.js";
import React from "react";

import "./game.css";

import Game from "./model/game";
import { cardValues } from "./model/constants.js";

function Card(props) {
  let color = props.color || "black";
  let draggable = props.draggable == undefined || props.draggable == true;
  return (
    <div
      className="card"
      draggable={draggable}
      onDragStart={props.onDragStart}
      onClick={props.onClick}
      style={{ color }}
    >
      {props.Unicode}
    </div>
  );
}

function Pile(props) {
  let key = 1;

  return (
    <div className="pile" id={props.id}>
      {props.cards.map(card => {
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
            key={key++}
            onDragStart={props.onCardDragStart}
            draggable={draggable}
          />
        );
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
      this.state.draggingCardContainer.takeCard();
      console.log(this.state)
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
      <div className="this.state">
        <div className="horizontal-layer">
          <div className="deck">
            <Card
              Unicode={cardUnicodes["BACK"][0]}
              draggable={false}
              onClick={this.changeActiveCard.bind(this)}
              key="1"
            />
            <Card
              onDragStart={this.onDragStart}
              Unicode={getUnicode(activeCard)}
              onCardDragStart={this.cardDragStart.bind(this)}
              draggable={true}
              key="2"
            />
          </div>

          <div className="deck" id="reservedDecks">
            {reservedDeckDivs}
          </div>
        </div>

        <div className="horizontal-layer">
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
