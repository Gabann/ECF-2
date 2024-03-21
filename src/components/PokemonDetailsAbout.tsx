import {Pokemon} from '../classes/Pokemon.ts';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {PokemonDetailsSubstats} from './PokemonDetailsSubstats.tsx';
import {GlobalStyles} from '../assets/globalStyles.ts';
import * as Progress from 'react-native-progress';

type Props = {
    pokemon: Pokemon;
}

export const PokemonDetailsAbout: React.FC<Props> = ({pokemon}) => {
    return (
        <View style={styles.container}>

            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <PokemonDetailsSubstats icon="weight" text="Poids" value={pokemon.weight.toString()}/>
                <PokemonDetailsSubstats icon="arrow-expand-vertical" text="Taille" value={pokemon.height.toString()}/>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <PokemonDetailsSubstats icon="format-list-bulleted-square" text="Catégorie" value={pokemon.category}/>
                <PokemonDetailsSubstats icon="pokeball" text="Talents" value={pokemon.talents.map(talent => talent.name).join()}/>
            </View>

            {/*Null check for pokemon.sexe*/}
            {Object.keys(pokemon.sexe).length > 0 ? (
                <>
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
                </>
            ) : null}
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

