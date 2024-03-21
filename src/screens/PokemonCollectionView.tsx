import {StyleSheet, Text, View} from 'react-native';
import {Pokemon} from '../classes/Pokemon.ts';
import React, {useEffect, useMemo} from 'react';
import {RootState} from '../store/store.ts';
import {useAppDispatch, useAppSelector} from '../store/hooks.ts';
import {loadPokemonList} from '../store/collectionSlice.ts';
import {PokemonList} from '../components/PokemonList.tsx';

export const PokemonCollectionView = () => {
	const dispatch = useAppDispatch();
	const pokemonList = useAppSelector((state: RootState) => state.apiSlice.pokemonList);
	const capturedPokemonIdList = useAppSelector((state: RootState) => state.pokedexSlice.capturedPokemonList);

	const capturedPokemonList: Pokemon[] = useMemo(() =>
			pokemonList.filter(pokemon => capturedPokemonIdList.includes(pokemon.pokedex_id)),
		[pokemonList, capturedPokemonIdList],
	);

	useEffect(() => {
		dispatch(loadPokemonList()).catch(error => console.error('Failed to fetch pokemon collection: ', error));
	}, []);

	//TODO add the filters to the collection view
	return (
		<View style={styles.container}>
			{capturedPokemonList.length > 0 ? (
				<View>
					<Text style={styles.text}>Ma collection</Text>
					<PokemonList pokemonList={capturedPokemonList}/>
				</View>
			) : (
				<Text style={styles.text}>Vous n'avez pas encore de pokemons dans votre collection</Text>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		fontSize: 50,
		fontWeight: 'bold',
		textAlign: 'center',
		color: 'black',
		padding: 20,
	},
});
