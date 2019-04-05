import { cardValues } from "./constants";

class Card {
  constructor(cardType, value) {
    this.cardType = cardType;
    this.facingUp = false;
    this.value = value;
    this.color = "black";
    if (cardType === "DIAMONDS" || cardType === "HEARTS") this.color = "red";
  }

  faceUp() {
    this.facingUp = true;
  }

  isFacingDown() {
    return !this.facingUp;
  }

  isNextCard(card) {
    const cardIndex = cardValues.indexOf(card.value);
    const thisIndex = cardValues.indexOf(this.value);
    return cardIndex - 1 === thisIndex;
  }

  isPreviousCard(card) {
    console.log(cardValues);
    const cardIndex = cardValues.indexOf(card.value);
    const thisIndex = cardValues.indexOf(this.value);
    console.log(thisIndex);
    console.log(cardIndex);
    return cardIndex + 1 === thisIndex;
  }
}

export default Card;
