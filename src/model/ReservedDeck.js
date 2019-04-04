class ReservedDeck {
  constructor(cardsType) {
    this.cards = [];
    this.cardsType = cardsType;
  }
  addCard(card) {
    let lastCard = this.cards[this.cards.length - 1];
    if (!this.cards.length == 0 || !lastCard.nextCard(card)) return false;
    if (this.cardsType != card.cardType) return false;
    this.cards.push(card);
    return true;
  }
}

export default ReservedDeck;
