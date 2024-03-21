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

	//TODO export flatlist to a separate component
	//BUG Evolution line display overflow outside the screen if the condition is too long
	return (
		<View style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 100, paddingHorizontal: 20}}>
			<FlatList
				data={previousEvolutions}
				contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
				horizontal={true}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({item}) => {
					const pokemon = getPokemonById(item.pokedex_id);
					return pokemon ? (
						<>
							<PokemonCard imageHeight={50} imageWidth={50} componentWidth={80} componentHeight={80} pokemon={pokemon}/>
							<View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
								<Text> {'<------'} </Text>
								<Text>{item.condition}</Text>
							</View>
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
				horizontal={true}
				renderItem={({item}) => {
					const pokemon = getPokemonById(item.pokedex_id);
					return pokemon ? (
						<>
							<View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
								<Text> {'------>'} </Text>
								<Text>{item.condition}</Text>
							</View>
							<PokemonCard imageHeight={50} imageWidth={50} componentWidth={80} componentHeight={80} pokemon={pokemon}/>
						</>
					) : null;
				}}
			/>
		</View>
	);
};
