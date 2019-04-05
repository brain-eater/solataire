import Deck from "./deck";
import Pile from "./pile";
import ReservedDeck from "./ReservedDeck";
import { cardTypes } from "./constants";

class Game {
  constructor() {
    this.piles = [];
    this.reservedDecks = [];
  }

  setup() {
    this.deck = new Deck();
    this.setPiles();
    this.setReservedDecks();
    return this;
  }

  setReservedDecks() {
    for (let cardType of cardTypes) {
      this.reservedDecks.push(new ReservedDeck(cardType));
    }
  }

  setPiles() {
    for (let pileNo = 1; pileNo <= 7; pileNo++) {
      let pile = new Pile();
      let cards = [];
      for (let cardNo = 1; cardNo <= pileNo; cardNo++) {
        cards.push(this.deck.drawCard());
      }
      pile.setCards(cards);
      this.piles.push(pile);
    }
  }
}

export default Game;
