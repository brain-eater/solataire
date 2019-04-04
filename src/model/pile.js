class Pile {
  setCards(cards) {
    this.cards = cards;
    const lastCard = this.cards[cards.length - 1];
    lastCard.faceUp();
  }

  addCard(card) {
    const lastCard = this.cards[this.cards.length];
    if (lastCard.color == card.color || card.isFacingDown()) return false;
    if (!lastCard.isNextCard(card)) return false;
    this.cards.push(card);
    return true;
  }
}
export default Pile;
