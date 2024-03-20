import {FlatList, ScrollView, StyleSheet, TextInput} from "react-native";
import {useAppDispatch} from "../store/hooks.ts";
import {getAllPokemons} from "../store/apiSlice.ts";
import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {Pokemon} from "../classes/Pokemon.ts";
import {PokemonCard} from "./PokemonCard.tsx";
import {TypeFilterButton} from "./TypeFilterButton.tsx";
import {pokemonTypes} from "../assets/globals.ts";
import {RootState} from "../store/store.ts";

export const PokemonList = () => {
	const dispatch = useAppDispatch();
	const pokemonList: Pokemon[] = useSelector((state: RootState) => state.apiSlice.pokemonList);

	const [nameFilter, setNameFilter] = useState<string>('');
	const [typeFilterList, setTypeFilterList] = useState<string[]>([]);
	const [filteredList, setFilteredList] = useState<Pokemon[]>([]);

	async function toggleTypeFilter(type: string) {
		setTypeFilterList(prevTypes => {
			if (prevTypes.includes(type)) {
				return prevTypes.filter(t => t !== type);
			} else {
				return [...prevTypes, type];
			}
		});
	}

	useEffect((): void => {
		(async () => {
			try {
				await dispatch(getAllPokemons()).unwrap();
			} catch (error) {
				console.error('Failed to fetch pokemons: ', error);
			}
		})();
	}, []);

	useEffect((): void => {
		filterList();
	}, [nameFilter, pokemonList, typeFilterList]);

	function filterByNameAndId(pokemon: Pokemon, filterString: string): boolean {
		let pokemonName = pokemon.name.fr.toUpperCase();
		let pokemonId = pokemon.pokedex_id.toString();
		return (pokemonName.includes(filterString) || pokemonId.startsWith(filterString));
	}

	function filterByType(pokemon: Pokemon, typeFilterList: string[]): boolean {
		return typeFilterList.every((type) => {
			return pokemon.types.some((pokemonType) => {
				return pokemonType.name === type;
			});
		});
	}

	function filterList(): void {
		let temporaryList = pokemonList;
		let filterString = nameFilter.trim().toUpperCase();

		temporaryList = temporaryList.filter((pokemon) => filterByNameAndId(pokemon, filterString));
		temporaryList = temporaryList.filter((pokemon) => filterByType(pokemon, typeFilterList));

		setFilteredList(temporaryList)
	}

	function onNameFilterChange(text: string) {
		setNameFilter(text);
	}

	return (
		<ScrollView>
			<TextInput
				style={{height: 40, borderColor: 'gray', borderWidth: 1}}
				onChangeText={text => onNameFilterChange(text)}
				value={nameFilter}
			/>

			<FlatList
				contentContainerStyle={styles.typeList}
				scrollEnabled={false}
				data={pokemonTypes}
				renderItem={({item}) => <TypeFilterButton type={item} toggleTypeFilter={toggleTypeFilter}></TypeFilterButton>}
				keyExtractor={(item) => item}
			/>

			<FlatList
				contentContainerStyle={{alignItems: 'center'}}
				scrollEnabled={false}
				data={filteredList}
				numColumns={3}
				renderItem={({item}) => (
					<PokemonCard pokemon={item}/>
				)}
				keyExtractor={(item: Pokemon) => item.pokedex_id.toString()}
			/>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	typeList: {
		justifyContent: 'center',
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
});
