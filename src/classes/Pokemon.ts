export type Evolution = {
    pre: EvolutionData[] | null;
    next: EvolutionData[] | null;
    mega: MegaEvolutionData | null;
}

export type MegaEvolutionData = {
    orbe: string;
    sprites: Sprites;
}

export type EvolutionData = {
    pokedex_id: number;
    name: string;
    condition: string;
}

export type Name = {
    fr: string
    en: string,
    jp: string
}

export type Resistances = {
    name: string;
    multiplier: number;
}

export type Sexe = {
    male: number;
    female: number;
}

export type Form = {
    region: string;
    name: string;
}

export type Sprites = {
    regular: string;
    shiny: string;
    gmax: string;
}

export type Types = {
    name: string;
    image: string;
}

export type Talents = {
    name: string;
    tc: boolean;
}

export type Stats = {
    hp: number;
    atk: number;
    def: number;
    spe_atk: number;
    spe_def: number;
    vit: number;
}

export class Pokemon {
    pokedex_id: number;
    generation: number;
    category: string;
    name: Name;
    sprites: Sprites;
    types: Types[];
    talents: Talents[];
    stats: Stats;
    resistances: Resistances[];
    evolution: Evolution;
    height: number;
    weight: number;
    egg_group: string[];
    sexe: Sexe;
    catchRate: number;
    xpToLevel100: number;
    form: Form;

    constructor(
        pokedex_id: number,
        generation: number,
        category: string,
        name: Name,
        sprites: Sprites,
        types: Types[],
        talents: Talents[],
        stats: Stats,
        resistances: Resistances[],
        evolution: Evolution,
        height: number,
        weight: number,
        egg_group: string[],
        sexe: Sexe,
        catchRate: number,
        xpToLevel100: number,
        form: Form,
    ) {
        this.pokedex_id = pokedex_id;
        this.generation = generation;
        this.category = category;
        this.name = name;
        this.sprites = sprites;
        this.types = types;
        this.talents = talents;
        this.stats = stats;
        this.resistances = resistances;
        this.evolution = evolution;
        this.height = height;
        this.weight = weight;
        this.egg_group = egg_group;
        this.sexe = sexe;
        this.catchRate = catchRate;
        this.xpToLevel100 = xpToLevel100;
        this.form = form;
    }
}
