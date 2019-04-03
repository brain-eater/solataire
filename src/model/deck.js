class Deck {
  constructor() {
    this.cards = [];
    fill();
  }

  fill() {
    for (let cardType in cardTypes) {
      for (let value of cardValues) {
        this.cards.push(new Card(cardType, value));
      }
    }
  }

  takeCard() {
    return this.cards.pop();
  }
}

export default Deck;
