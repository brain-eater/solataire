class ReservedDeck {
  constructor(cardsType) {
    this.cards = [];
    this.cardsType = cardsType;
  }
  addCard(card) {
    let lastCard = this.cards[this.cards.length - 1];
    if (this.cardsType != card.cardType) return false;
    if (!lastCard && card.value != "A") return false;
    if (lastCard && !lastCard.nextCard(card)) return false;
    this.cards.push(card);
    return true;
  }
  getActiveCard() {
    return this.cards[this.cards.length - 1];
  }

  takeCard() {
    return this.cards.pop();
  }
}

export default ReservedDeck;
