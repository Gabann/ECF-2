type Evolution = {
	pokedex_id: number;
	name: string;
	condition: string;
}

type Name = {
	fr: string
	en: string,
	jp: string
}

type Resistances = {
	name: string;
	multiplier: number;
}

type GenderRatio = {
	male: number;
	female: number;
}

type Form = {
	region: string;
	name: string;
}

type Sprites = {
	regular: string;
	shiny: string;
	gmax: string;
}

type Types = {
	name: string;
	image: string;
}

type Talents = {
	name: string;
	tc: boolean;
}

type Stats = {
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
	evolution: Evolution[];
	height: number;
	weight: number;
	egg_group: string[]
	genderRatio: GenderRatio
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
		evolution: Evolution[],
		height: number,
		weight: number,
		egg_group: string[],
		genderRatio: GenderRatio,
		catchRate: number,
		xpToLevel100: number,
		form: Form
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
		this.genderRatio = genderRatio;
		this.catchRate = catchRate;
		this.xpToLevel100 = xpToLevel100;
		this.form = form;
	}
}
