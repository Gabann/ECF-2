import {Pokemon} from '../classes/Pokemon.ts';
import {Text} from 'react-native';
import React from 'react';

type Props = {
    pokemon: Pokemon;
}

export const PokemonDetailsStats: React.FC<Props> = ({pokemon}) => {
    return (
        <>
            <Text>Stats</Text>
            <Text>HP: {pokemon.stats.hp}</Text>
            <Text>Attack: {pokemon.stats.atk}</Text>
            <Text>Defense: {pokemon.stats.def}</Text>
            <Text>Special Attack: {pokemon.stats.spe_atk}</Text>
            <Text>Special Defense: {pokemon.stats.spe_def}</Text>
            <Text>Speed: {pokemon.stats.vit}</Text>
        </>
    );
};
