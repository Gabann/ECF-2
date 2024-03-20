import {FlatList, ScrollView} from 'react-native';
import {PokemonCard} from '../components/PokemonCard.tsx';
import {Pokemon} from '../classes/Pokemon.ts';
import React from 'react';
import {RootState} from '../store/store.ts';
import {useAppSelector} from '../store/hooks.ts';

export const PokemonCollectionView = () => {
    const capturedPokemonList: Pokemon[] = useAppSelector((state: RootState) => state.apiSlice.pokemonList.filter(pokemon => state.pokedexSlice.capturedPokemonList.includes(pokemon.pokedex_id)));

    return (
        <ScrollView>
            <FlatList
                contentContainerStyle={{alignItems: 'center'}}
                scrollEnabled={false}
                data={capturedPokemonList}
                numColumns={3}
                renderItem={({item}) => (
                    <PokemonCard pokemon={item}/>
                )}
                keyExtractor={(item: Pokemon) => item.pokedex_id.toString()}
            />
        </ScrollView>
    );
};
