import React from 'react';
import {EvolutionLine} from './EvolutionLine.tsx';
import {EvolutionData, Pokemon} from '../../classes/Pokemon.ts';

type Props = {
	pokemon: Pokemon;
}

export const PokemonDetailsEvolution: React.FC<Props> = ({pokemon}) => {
	let previousEvolutionData: EvolutionData[] = pokemon.evolution.pre || [];
	let nextEvolutionData: EvolutionData[] = pokemon.evolution.next || [];

	return (
		<EvolutionLine
			previousEvolutions={previousEvolutionData}
			nextEvolutions={nextEvolutionData}
			currentPokemonSprite={pokemon.sprites.regular}/>
	);
};
