import {Pokemon} from '../classes/Pokemon.ts';
import {FlatList} from 'react-native';
import {PokemonCard} from './PokemonCard.tsx';
import React from 'react';

type Props = {
	pokemonList: Pokemon[]
}
export const PokemonList: React.FC<Props> = ({pokemonList}) => {
	return (
		<FlatList
			contentContainerStyle={{alignItems: 'center'}}
			data={pokemonList}
			numColumns={3}
			renderItem={({item}) => (
				<PokemonCard pokemon={item}/>
			)}
			keyExtractor={(item: Pokemon) => item.pokedex_id.toString()}
		/>
	);
};
