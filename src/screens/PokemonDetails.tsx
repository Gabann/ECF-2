import {FlatList, Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View} from 'react-native';
import {SceneMap, TabView} from 'react-native-tab-view';
import React, {useState} from 'react';
import {PokemonDetailsAbout} from '../components/PokemonDetailsAbout.tsx';
import {Pokemon} from '../classes/Pokemon.ts';
import {useRoute} from '@react-navigation/native';
import {PokemonDetailsStats} from '../components/PokemonDetailsStats.tsx';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {GlobalStyles} from '../assets/globalStyles.ts';
import {togglePokemonCaptured} from '../store/collectionSlice.ts';
import {TypeCard} from '../components/TypeCard.tsx';
import {useAppDispatch, useAppSelector} from '../store/hooks.ts';
import {RootState} from '../store/store.ts';
import {PokemonDetailsEvolution} from '../components/PokemonDetailsEvolution.tsx';

type RouteParams = {
    pokemon: Pokemon;
}

export const PokemonDetails = () => {
    const dispatch = useAppDispatch();
    const route = useRoute();
    const {pokemon} = route.params as RouteParams;
    const isCaptured: boolean = useAppSelector((state: RootState) => state.pokedexSlice.capturedPokemonList.includes(pokemon.pokedex_id));
    const [isShiny, setIsShiny] = React.useState(false);


    const AboutRoute = () => (
        <PokemonDetailsAbout pokemon={pokemon}/>
    );

    const StatsRoute = () => (
        <PokemonDetailsStats pokemon={pokemon}/>
    );

    const EvolutionsRoute = () => (
        <PokemonDetailsEvolution pokemon={pokemon}/>
    );

    const renderScene = SceneMap({
        About: AboutRoute,
        Stats: StatsRoute,
        Evolutions: EvolutionsRoute,
    });

    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        {key: 'About', title: 'About'},
        {key: 'Stats', title: 'Stats'},
        {key: 'Evolutions', title: 'Evolutions'},
    ]);

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity style={[styles.shinyButton]}
                                  onPress={() => {
                                      setIsShiny(!isShiny);
                                  }}>
                    <Icon name={isShiny ? 'star' : 'star-outline'} size={20} color={'black'}/>
                </TouchableOpacity>

                <View style={GlobalStyles.horizontalCenter}>
                    <Image
                        source={{uri: isShiny ? pokemon.sprites.shiny : pokemon.sprites.regular}}
                        style={{width: 300, height: 300}}/>
                </View>
                <TouchableOpacity style={isCaptured ? styles.onStyle : styles.offStyle}
                                  onPress={() => dispatch(togglePokemonCaptured(pokemon.pokedex_id))}>
                    <Text>{'Ajouter à l\'équipe'}</Text>
                </TouchableOpacity>

                <Text style={GlobalStyles.title}>{pokemon.name.fr}</Text>

                <Text>№ {String(pokemon.pokedex_id).padStart(3, '0')} - Génération {pokemon.generation}</Text>

                <FlatList
                    scrollEnabled={false}
                    data={pokemon.types}
                    numColumns={2}
                    renderItem={({item}) =>
                        <TypeCard type={item}/>
                    }
                    keyExtractor={(item, index: number) => item.name + index.toString()}/>
            </View>

            <TabView
                navigationState={{index, routes}}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{width: layout.width}}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },
    onStyle: {
        backgroundColor: 'green',
    },
    offStyle: {
        backgroundColor: 'red',
    },
    text: {},
    shinyButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        borderRadius: 50,
        padding: 10,
        borderWidth: 1,
    },
});
