import { Injectable } from '@angular/core';
import { Card, CardType, CardSubtype } from '../entities/card';
import { Observable, of } from 'rxjs';
import { StatAbilty, SacificeDraw, SacificeLife, Flying, AbilityC } from '../entities/ability';
import { Mana } from '../entities/mana';
import { randomNumber } from '../shared/helper';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor() { }

  getAllCards(): Observable<Array<Card>> {
    let result = new Array<Card>();

    result = this.getAllMockCards();
    return of(result);
  }

  private getAllMockCards(): Array<Card> {
    const result = new Array<Card>();

    let card = new Card();
    card.Id = randomNumber();
    card.Name = 'Fathom Fleet Firebrand';

    card.Cost.set(Mana.Colorless, 1);
    card.Cost.set(Mana.Mountain, 1);
    card.Type.push(CardType.Creature);
    card.Subtype.push(CardSubtype.Human);
    card.Subtype.push(CardSubtype.Pirate);
    card.Abilities.push(new StatAbilty(1, 0));
    result.push(card);

    card = new Card();
    card.Id = randomNumber();
    card.Name = 'Shore Keeper';
    card.Cost.set(Mana.Island, 1);
    card.Type.push(CardType.Creature);
    card.Subtype.push(CardSubtype.Tribobite);
    card.Abilities.push(new SacificeDraw(1, 0));
    result.push(card);

    card = new Card();
    card.Id = randomNumber();
    card.Name = 'Blight Keeper';
    card.Cost.set(Mana.Swamp, 1);
    card.Type.push(CardType.Creature);
    card.Subtype.push(CardSubtype.Bat);
    card.Subtype.push(CardSubtype.Imp);
    card.Abilities.push(new SacificeLife());
    card.Abilities.push(new Flying());
    result.push(card);

    card = new Card();
    card.Id = randomNumber();
    card.Name = 'Kopala, Warden of Waves';
    card.Cost.set(Mana.Island, 2);
    card.Cost.set(Mana.Colorless, 1);
    card.Type.push(CardType.Creature);
    card.Subtype.push(CardSubtype.Legendary);
    card.Subtype.push(CardSubtype.Merfolk);
    card.Subtype.push(CardSubtype.Wizard);
    card.Abilities.push(new AbilityC());
    card.Abilities.push(new Flying());
    result.push(card);

    return result;
  }
}
