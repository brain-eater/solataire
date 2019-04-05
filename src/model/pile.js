class Pile {
  setCards(cards) {
    this.cards = cards;
    const lastCard = this.cards[cards.length - 1];
    lastCard.faceUp();
  }

  addCard(card) {
    const lastCard = this.cards[this.cards.length - 1];
    console.log(lastCard, card);
    if (lastCard.color === card.color) return false;
    if (!lastCard.isPreviousCard(card)) return false;
    this.cards.push(card);
    return true;
  }

  getActiveCard() {
    return this.cards[this.cards.length - 1];
  }

  takeCard() {
    if (this.cards.length > 1) {
      this.cards[this.cards.length - 2].faceUp();
    }
    return this.cards.pop();
  }
}
export default Pile;
