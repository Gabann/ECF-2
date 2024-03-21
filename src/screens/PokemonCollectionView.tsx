import {FlatList, ScrollView} from 'react-native';
import {PokemonCard} from '../components/PokemonCard.tsx';
import {Pokemon} from '../classes/Pokemon.ts';
import React, {useEffect, useMemo} from 'react';
import {RootState} from '../store/store.ts';
import {useAppDispatch, useAppSelector} from '../store/hooks.ts';
import {loadPokemonList} from '../store/collectionSlice.ts';

export const PokemonCollectionView = () => {
    const dispatch = useAppDispatch();
    const pokemonList = useAppSelector((state: RootState) => state.apiSlice.pokemonList);
    const capturedPokemonIdList = useAppSelector((state: RootState) => state.pokedexSlice.capturedPokemonList);

    const capturedPokemonList: Pokemon[] = useMemo(() =>
            pokemonList.filter(pokemon => capturedPokemonIdList.includes(pokemon.pokedex_id)),
        [pokemonList, capturedPokemonIdList],
    );

    useEffect((): void => {
        (async (): Promise<void> => {
            try {
                await dispatch(loadPokemonList());
            } catch (error) {
                console.error('Failed to fetch pokemon collection: ', error);
            }
        })();
    }, []);

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
