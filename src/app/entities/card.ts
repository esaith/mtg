import { IAbility } from './ability';
import { Mana } from './mana';
import { single } from 'rxjs/operators';

export enum CardType {
    Creature,
    Land,
    Enchantment,
    Artifact,
    Instant,
    Sorcery
}

export enum CardSubtype {
    Legendary,
    Human,
    Pirate,
    Tribobite,
    Bat,
    Imp,
    Merfolk,
    Wizard
}

export class Card {
    Id: number;
    Name: string;
    Cost = new Map<Mana, number>();
    Type = new Array<CardType>();
    Subtype = new Array<CardSubtype>();

    Abilities = new Array<IAbility>();
}

