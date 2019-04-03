class Pile {
  setCards(cards) {
    this.cards = cards;
    const lastCard = this.cards[cards.length];
    lastCard.faceUp();
  }

  addCard(card) {
    const lastCard = this.cards[cards.length];
    if (lastCard.colour == card.colour || card.isFacingDown()) return false;
    if (!lastCard.isNextCard(Card)) return false;
    this.cards.push(card);
    return true;
  }
}
export default Pile;
