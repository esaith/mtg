
// Decorator pattern ?
// With strategy pattern ?
export interface IAbility {
    Id: number;
    Name: string;
    Abilities: Array<IAbility>;
    AbilityType: AbiltiyType;
}

export enum AbiltiyType {
    Static,
    Triggered,
    Activated
}

export class StatAbilty implements IAbility {
    Id: number;
    Name: string;
    AbilityType: AbiltiyType.Activated;
    Abilities: Array<IAbility>;

    StrengthBonus: number;
    DefenseBonus: number;


    constructor(str?: number, def?: number, abilities?: Array<IAbility>) {
        this.StrengthBonus = str ? str : 0;
        this.DefenseBonus = def ? def : 0;
        this.Abilities = abilities ? abilities : new Array<IAbility>();
    }
}


export class SacificeDraw implements IAbility {
    Id: number;
    Name: string;
    AbilityType: AbiltiyType.Activated;
    Abilities: Array<IAbility>;

    StrengthBonus: number;
    DefenseBonus: number;


    constructor(str?: number, def?: number, abilities?: Array<IAbility>) {
        this.StrengthBonus = str ? str : 0;
        this.DefenseBonus = def ? def : 0;
        this.Abilities = abilities ? abilities : new Array<IAbility>();
    }
}

export class SacificeLife implements IAbility {
    Id: number;
    Name: string;
    AbilityType: AbiltiyType.Activated;
    Abilities: Array<IAbility>;

    StrengthBonus: number;
    DefenseBonus: number;


    constructor(str?: number, def?: number, abilities?: Array<IAbility>) {
        this.StrengthBonus = str ? str : 0;
        this.DefenseBonus = def ? def : 0;
        this.Abilities = abilities ? abilities : new Array<IAbility>();
    }
}

export class Flying implements IAbility {
    Id: number;
    Name: string;
    AbilityType: AbiltiyType.Activated;
    Abilities: Array<IAbility>;

    Flying = true;

    constructor(abilities?: Array<IAbility>) {
        this.Abilities = abilities ? abilities : new Array<IAbility>();
    }
}

export class AbilityC implements IAbility {
    Id: number;
    Name: string;
    AbilityType: AbiltiyType.Activated;
    Abilities: Array<IAbility>;

    Flying = true;

    constructor(abilities?: Array<IAbility>) {
        this.Abilities = abilities ? abilities : new Array<IAbility>();
    }
}
