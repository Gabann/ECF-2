import React from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import {EvolutionData} from '../../classes/Pokemon.ts';
import {useAppSelector} from '../../store/hooks.ts';
import {RootState} from '../../store/store.ts';
import {PokemonCard} from '../PokemonCard.tsx';

type Props = {
	currentPokemonSprite: string;
	previousEvolutions: EvolutionData[];
	nextEvolutions: EvolutionData[];
}

export const EvolutionLine: React.FC<Props> = ({nextEvolutions, currentPokemonSprite, previousEvolutions}) => {
	const pokemonList = useAppSelector((state: RootState) => state.apiSlice.pokemonList);

	function getPokemonById(pokedex_id: number) {
		return pokemonList.find(pokemon => pokemon.pokedex_id === pokedex_id);
	}

	return (
		<View style={{flexDirection: 'row', alignItems: 'center'}}>
			<FlatList
				data={previousEvolutions}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({item}) => {
					const pokemon = getPokemonById(item.pokedex_id);
					return pokemon ? (
						<>
							<Text> {'<------'} </Text>
							<Text>{item.condition}</Text>
							<PokemonCard pokemon={pokemon}/>
						</>
					) : null;
				}}
			/>

			<Image
				source={{uri: currentPokemonSprite}}
				style={{width: 80, height: 80}}/>

			<FlatList
				data={nextEvolutions}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({item}) => {
					const pokemon = getPokemonById(item.pokedex_id);
					return pokemon ? (
						<>
							<Text> {'------>'} </Text>
							<Text>{item.condition}</Text>
							<PokemonCard pokemon={pokemon}/>
						</>
					) : null;
				}}
			/>
		</View>
	);
};
