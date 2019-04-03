class Card {
  constructor(cardType, value) {
    this.cardType = cardType;
    this.facingUp = false;
    this.value = value;
    this.colour = "black";
    if (cardType == "DIAMONDS" || cardType == "HEARTS") this.colour = "red";
  }

  faceUp() {
    this.facingUp = true;
  }

  isFacingDown() {
    return !this.facingUp;
  }

  isNextCard(card) {
    const cardIndex = cardTypes.indexOf(card.value);
    const thisIndex = cardTypes.indexOf(this.value);
    return cardIndex - 1 == thisIndex;
  }
}

export default Card;
