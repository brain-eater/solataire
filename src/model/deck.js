import { cardTypes, cardValues } from "./constants";
import Card from "./card";
import { shuffle } from "lodash";

class Deck {
  constructor() {
    this.cards = [];
    this.fill();
  }

  fill() {
    for (let cardType of cardTypes) {
      for (let value of cardValues) {
        this.cards.push(new Card(cardType, value));
      }
    }
    this.cards = shuffle(this.cards);
  }

  drawCard() {
    return this.cards.pop();
  }

  getActiveCard() {
    return this.cards[this.cards.length - 1];
  }

  changeActiveCard() {
    let activeCard = this.cards.pop();
    this.cards.unshift(activeCard);
  }

  takeCard() {
    return this.cards.pop();
  }
}

export default Deck;
