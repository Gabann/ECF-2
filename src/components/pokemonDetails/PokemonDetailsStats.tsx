import {FlatList, Text} from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';
import {Pokemon} from '../../classes/Pokemon.ts';
import {TypeResistanceCard} from './TypeResistanceCard.tsx';

type Props = {
	pokemon: Pokemon;
}

export const PokemonDetailsStats: React.FC<Props> = ({pokemon}) => {
	return (
		<>
			{/*Null check for pokemon.stats*/}
			{Object.keys(pokemon.sexe).length > 0 ? (
				<>
					<Text>PV: {pokemon.stats.hp}</Text>
					<Progress.Bar
						progress={pokemon.stats.hp / 255}
						color={'#0B97FF'}
						borderWidth={1}
						width={400}/>

					<Text>Attaque: {pokemon.stats.atk}</Text>
					<Progress.Bar
						progress={pokemon.stats.atk / 255}
						color={'#0B97FF'}
						borderWidth={1}
						width={400}/>

					<Text>Defense: {pokemon.stats.def}</Text>
					<Progress.Bar
						progress={pokemon.stats.def / 255}
						color={'#0B97FF'}
						borderWidth={1}
						width={400}/>

					<Text>Attaque spéciale: {pokemon.stats.spe_atk}</Text>
					<Progress.Bar
						progress={pokemon.stats.spe_atk / 255}
						color={'#0B97FF'}
						borderWidth={1}
						width={400}/>

					<Text>Defense spéciale: {pokemon.stats.spe_def}</Text>
					<Progress.Bar
						progress={pokemon.stats.spe_def / 255}
						color={'#0B97FF'}
						borderWidth={1}
						width={400}/>

					<Text>Vitesse: {pokemon.stats.vit}</Text>
					<Progress.Bar
						progress={pokemon.stats.vit / 255}
						color={'#0B97FF'}
						borderWidth={1}
						width={400}/>
				</>
			) : null}

			<FlatList
				data={pokemon.resistances}
				scrollEnabled={false}
				numColumns={5}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({item}) => <TypeResistanceCard type={item.name} resistance={item.multiplier.toString()}/>}
				contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
			/>
		</>
	);
};
