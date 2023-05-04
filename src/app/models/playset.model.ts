import { CardModel } from "./card.model";

export class PlaysetModel {
  name: string;
  cards: CardModel[];

  constructor() {
    this.name = '';
    this.cards = [];
  }
  
}
