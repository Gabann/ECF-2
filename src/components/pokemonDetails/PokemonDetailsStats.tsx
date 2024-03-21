import {FlatList, Text, View} from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';
import {Pokemon} from '../../classes/Pokemon.ts';
import {TypeResistanceCard} from './TypeResistanceCard.tsx';

type Props = {
	pokemon: Pokemon;
}

export const PokemonDetailsStats: React.FC<Props> = ({pokemon}) => {
	//TODO export stats to a separate component
	return (
		<>
			{/*Null check for pokemon.stats*/}
			{Object.keys(pokemon.stats).length > 0 ? (
				<>
					<View style={{flexDirection: 'row', justifyContent: 'center', paddingVertical: 10}}>
						<View style={{width: '40%', paddingRight: 10}}>
							<Text style={{textAlign: 'center'}}>PV: {pokemon.stats.hp}</Text>
							<Progress.Bar
								progress={pokemon.stats.hp / 255}
								color={'#0B97FF'}
								borderWidth={1}
								width={180}
								height={10}
							/>
						</View>

						<View style={{width: '40%', paddingLeft: 10}}>
							<Text style={{textAlign: 'center'}}>Attaque: {pokemon.stats.atk}</Text>
							<Progress.Bar
								progress={pokemon.stats.atk / 255}
								color={'#0B97FF'}
								borderWidth={1}
								width={180}
								height={10}
							/>
						</View>
					</View>


					<View style={{flexDirection: 'row', justifyContent: 'center', paddingVertical: 10}}>
						<View style={{width: '40%', paddingRight: 10}}>
							<Text style={{textAlign: 'center'}}>Defense: {pokemon.stats.def}</Text>
							<Progress.Bar
								progress={pokemon.stats.def / 255}
								color={'#0B97FF'}
								borderWidth={1}
								width={180}
								height={10}
							/>
						</View>

						<View style={{width: '40%', paddingLeft: 10}}>
							<Text style={{textAlign: 'center'}}>Attaque spe: {pokemon.stats.spe_atk}</Text>
							<Progress.Bar
								progress={pokemon.stats.spe_atk / 255}
								color={'#0B97FF'}
								borderWidth={1}
								width={180}
								height={10}
							/>
						</View>
					</View>


					<View style={{flexDirection: 'row', justifyContent: 'center', paddingVertical: 10}}>
						<View style={{width: '40%', paddingRight: 10}}>
							<Text style={{textAlign: 'center'}}>Defense spe: {pokemon.stats.spe_def}</Text>
							<Progress.Bar
								progress={pokemon.stats.spe_def / 255}
								color={'#0B97FF'}
								borderWidth={1}
								width={180}
								height={10}
							/>
						</View>

						<View style={{width: '40%', paddingLeft: 10}}>
							<Text style={{textAlign: 'center'}}>Vitesse: {pokemon.stats.vit}</Text>
							<Progress.Bar
								progress={pokemon.stats.vit / 255}
								color={'#0B97FF'}
								borderWidth={1}
								width={180}
								height={10}
							/>
						</View>
					</View>

				</>
			) : null}

			<FlatList
				data={pokemon.resistances}
				scrollEnabled={false}
				numColumns={6}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({item}) => <TypeResistanceCard type={item.name} resistance={item.multiplier.toString()}/>}
				contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
			/>
		</>
	);
};
