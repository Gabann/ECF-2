import {StyleSheet, TextInput, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../store/hooks.ts';
import React, {useEffect, useState} from 'react';
import {Pokemon} from '../classes/Pokemon.ts';
import {TypeFilterButton} from '../components/TypeFilterButton.tsx';
import {pokemonTypes} from '../assets/globals.ts';
import {RootState} from '../store/store.ts';
import {GlobalStyles} from '../assets/globalStyles.ts';
import {getAllPokemons} from '../store/apiSlice.ts';
import {PokemonList} from '../components/PokemonList.tsx';

export const PokedexView = () => {
	const dispatch = useAppDispatch();
	const pokemonList: Pokemon[] = useAppSelector((state: RootState) => state.apiSlice.pokemonList);

	const [nameFilter, setNameFilter] = useState<string>('');
	const [typeFilterList, setTypeFilterList] = useState<string[]>([]);
	const [filteredList, setFilteredList] = useState<Pokemon[]>([]);

	async function toggleTypeFilter(typeToToggle: string): Promise<void> {
		setTypeFilterList((previousList: string[]) => {
			if (previousList.includes(typeToToggle)) {
				return previousList.filter((type: string) => type !== typeToToggle);
			} else {
				return [...previousList, typeToToggle];
			}
		});
	}

	useEffect((): void => {
		(async (): Promise<void> => {
			try {
				await dispatch(getAllPokemons());
			} catch (error) {
				console.error('Failed to fetch pokemons list: ', error);
			}
		})();
	}, []);

	useEffect((): void => {
		filterList();
	}, [nameFilter, pokemonList, typeFilterList]);

	function filterByNameAndId(pokemon: Pokemon, filterString: string): boolean {
		let pokemonName: string = pokemon.name.fr.toUpperCase();
		let pokemonId: string = pokemon.pokedex_id.toString();
		return (pokemonName.includes(filterString) || pokemonId.startsWith(filterString));
	}

	function filterByType(pokemon: Pokemon): boolean {
		return typeFilterList.every((type: string) => {
			return pokemon.types.some((pokemonType) => {
				return pokemonType.name === type;
			});
		});
	}

	function filterList(): void {
		let temporaryList: Pokemon[] = pokemonList;
		let filterString: string = nameFilter.trim().toUpperCase();

		temporaryList = temporaryList.filter((pokemon) => filterByNameAndId(pokemon, filterString));
		temporaryList = temporaryList.filter((pokemon) => filterByType(pokemon));

		setFilteredList(temporaryList);
	}

	function onNameFilterChange(text: string): void {
		setNameFilter(text);
	}

	return (
		<View style={[GlobalStyles.verticalCenter, GlobalStyles.horizontalCenter, {paddingTop: 15}]}>
			<View style={styles.typeList}>
				{pokemonTypes.map((item: string) => (
					<TypeFilterButton key={item} type={item} toggleTypeFilter={toggleTypeFilter}/>
				))}
			</View>
			<TextInput
				style={{height: 40, borderWidth: 1, width: 400, marginBottom: 10}}
				onChangeText={text => onNameFilterChange(text)}
				value={nameFilter}
				placeholder={'Nom ou numéro du pokémon'}/>


			<PokemonList pokemonList={filteredList}/>
		</View>
	);
};

const styles = StyleSheet.create({
	typeList: {
		justifyContent: 'center',
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
});
