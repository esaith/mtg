import { Card } from './card';

export class Deck {
    Name: string;
    Id: number;

    Cards = new Array<Card>();
}

export class DeckVM extends Deck {
    editing = false;

    constructor(deck?: Deck) {
        super();

        if (deck) {
            this.Name = deck.Name;
            this.Id = deck.Id;
            this.Cards = deck.Cards;
        }
    }
}
