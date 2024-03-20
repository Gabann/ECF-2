import {Pokemon} from '../classes/Pokemon.ts';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../store/hooks.ts';
import {togglePokemonCaptured} from '../store/pokedexSlice.ts';
import {RootState} from '../store/store.ts';
import React from 'react';
import {GlobalStyles} from '../assets/globalStyles.ts';
import {TypeCard} from '../components/TypeCard.tsx';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {PokemonDetailsSubstats} from '../components/PokemonDetailsSubstats.tsx';
import * as Progress from 'react-native-progress';

type RouteParams = {
    pokemon: Pokemon;
}
export const PokemonDetails: React.FC = () => {
    const route = useRoute();
    const {pokemon} = route.params as RouteParams;
    const dispatch = useAppDispatch();
    const isCaptured: boolean = useAppSelector((state: RootState) => state.pokedexSlice.capturedPokemonList.includes(pokemon.pokedex_id));

    const [isShiny, setIsShiny] = React.useState(false);

    return (
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

            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <PokemonDetailsSubstats icon="weight" text="Poids" value={pokemon.weight.toString()}/>
                <PokemonDetailsSubstats icon="arrow-expand-vertical" text="Taille" value={pokemon.height.toString()}/>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <PokemonDetailsSubstats icon="format-list-bulleted-square" text="Catégorie" value={pokemon.category}/>
                <PokemonDetailsSubstats icon="pokeball" text="Talents" value={pokemon.talents.map(talent => talent.name).join()}/>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <View>
                    <Text style={[GlobalStyles.verticalCenter, {textAlign: 'center'}, {color: 'black'}]}>Genre</Text>
                    <Progress.Bar
                        progress={pokemon.sexe.female / 100}
                        color={'#FF59B8'}
                        unfilledColor={'#0B97FF'}
                        borderWidth={0}
                        width={400}
                    />
                </View>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>♀ {pokemon.sexe.female}%</Text>
                <Text>♂ {pokemon.sexe.male}%</Text>
            </View>
        </View>
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

