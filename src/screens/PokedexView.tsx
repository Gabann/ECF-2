import {FlatList, ScrollView, StyleSheet, TextInput, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../store/hooks.ts';
import {getAllPokemons} from '../store/apiSlice.ts';
import React, {useEffect, useState} from 'react';
import {Pokemon} from '../classes/Pokemon.ts';
import {PokemonCard} from '../components/PokemonCard.tsx';
import {TypeFilterButton} from '../components/TypeFilterButton.tsx';
import {pokemonTypes} from '../assets/globals.ts';
import {RootState} from '../store/store.ts';
import {GlobalStyles} from '../assets/globalStyles.ts';

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
        <ScrollView>
            <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={text => onNameFilterChange(text)}
                value={nameFilter}
            />

            {/*<FlatList*/}
            {/*    contentContainerStyle={styles.typeList}*/}
            {/*    scrollEnabled={false}*/}
            {/*    data={pokemonTypes}*/}
            {/*    renderItem={({item}) => <TypeFilterButton type={item} toggleTypeFilter={toggleTypeFilter}></TypeFilterButton>}*/}
            {/*    keyExtractor={(item) => item}*/}
            {/*/>*/}

            <View style={[styles.typeList, GlobalStyles.horizontalCenter]}>
                {pokemonTypes.map((item: string) => (
                    <TypeFilterButton key={item} type={item} toggleTypeFilter={toggleTypeFilter}/>
                ))}
            </View>

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
        flexWrap: 'wrap',
    },
});
