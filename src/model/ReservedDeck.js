class ReservedDeck {
  constructor() {
    this.cards = [];
    this.cardsType = null;
  }
  addCard(card) {
    let lastCard = this.cards[this.cards.length - 1];
    if (!lastCard && card.value != "A") return false;
    if (this.cardsType && this.cardsType != card.cardType) return false;
    console.log(lastCard);
    if (lastCard && !lastCard.nextCard(card)) return false;
    this.cardsType = card.cardType;
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
