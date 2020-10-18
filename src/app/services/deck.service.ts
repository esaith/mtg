import { Injectable } from '@angular/core';
import { Deck, DeckVM } from '../entities/deck';
import { Observable, of } from 'rxjs';

import { randomNumber } from '../shared/helper';

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  constructor() { }

  getDecksByUserId(id: number): Observable<Array<DeckVM>> {
    let httpResult = new Array<Deck>();
    httpResult = this.mockDecks();

    const deckVMs: Array<DeckVM> = httpResult.map(deck => new DeckVM(deck));
    return of(deckVMs);
  }

  private mockDecks(): Array<Deck> {
    const result = new Array<Deck>();

    for (let i = 0; i < 5; ++i) {
      const deck = new Deck();
      deck.Name = `Deck ${i + 1}`;
      deck.Id = randomNumber();
      result.push(deck);
    }

    return result;
  }


}
