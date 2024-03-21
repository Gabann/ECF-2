import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {PokemonDetailsSubstats} from './PokemonDetailsSubstats.tsx';
import * as Progress from 'react-native-progress';
import {GlobalStyles} from '../../assets/globalStyles.ts';
import {Pokemon} from '../../classes/Pokemon.ts';

type Props = {
	pokemon: Pokemon;
}

export const PokemonDetailsAbout: React.FC<Props> = ({pokemon}) => {

	return (
		<View style={styles.container}>

			<View style={styles.rowCenter}>
				<PokemonDetailsSubstats icon="weight" text="Poids" value={pokemon.weight.toString()}/>
				<PokemonDetailsSubstats icon="arrow-expand-vertical" text="Taille" value={pokemon.height.toString()}/>
			</View>
			<View style={styles.rowCenter}>
				<PokemonDetailsSubstats icon="format-list-bulleted-square" text="Catégorie" value={pokemon.category}/>
				<PokemonDetailsSubstats icon="weather-sunny" text="Talents" value={pokemon.talents.map(talent => talent.name).join()}/>
			</View>

			<View style={styles.rowCenter}>
				<PokemonDetailsSubstats icon="pokeball" text="Taux capture" value={pokemon.catchRate.toString()}/>
				<PokemonDetailsSubstats
					icon="star-four-points"
					text="Xp lvl 100"
					value={pokemon.xpToLevel100.toLocaleString('us').toString()}/>
			</View>

			{/*Null check for pokemon.sexe*/}
			{Object.keys(pokemon.sexe).length > 0 ? (
				<>
					<View style={styles.rowCenterAlign}>
						<View>
							<Text
								style={[GlobalStyles.verticalCenter, styles.centerText, styles.blackText, {paddingBottom: 10}]}>Sexe</Text>
							<Progress.Bar
								progress={pokemon.sexe.female / 100}
								color={'#FF59B8'}
								unfilledColor={'#0B97FF'}
								borderWidth={0}
								width={400}
							/>
						</View>
					</View>

					<View style={styles.rowSpaceBetween}>
						<Text style={styles.paddingText}>♀ {pokemon.sexe.female}%</Text>
						<Text style={styles.paddingText}>♂ {pokemon.sexe.male}%</Text>
					</View>
				</>
			) : null}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10,
		paddingVertical: 20,
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
	rowCenter: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	rowCenterAlign: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	centerText: {
		textAlign: 'center',
	},
	blackText: {
		color: 'black',
	},
	rowSpaceBetween: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	paddingText: {
		paddingHorizontal: 15,
		paddingTop: 5,
		color: 'black',
	},
});
