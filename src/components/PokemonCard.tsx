import {Pokemon} from '../classes/Pokemon.ts';
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../App.tsx';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {typeColors} from '../assets/globals.ts';

type Props = {
	pokemon: Pokemon;
	imageWidth?: number;
	imageHeight?: number;
	componentWidth?: number;
	componentHeight?: number;
}
export const PokemonCard: React.FC<Props> = (
	{
		pokemon,
		imageWidth = 120,
		imageHeight = 120,
		componentWidth = Dimensions.get('window').width * 0.28,
		componentHeight = 150,
	}) => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();

	function handlePress(): void {
		navigation.navigate('PokemonDetails', {
			pokemon: pokemon,
		});
	}

	let colors = ['#FFFFFF', '#FFFFFF'];

	if (pokemon.types.length > 0) {
		colors[0] = typeColors[pokemon.types[0].name];
		colors[1] = pokemon.types.length < 2 ? colors[0] : typeColors[pokemon.types[1].name];
	}

	return (
		<TouchableOpacity onPress={handlePress}>
			<LinearGradient
				colors={colors}
				style={[styles.view, {width: componentWidth, height: componentHeight}]}
				start={{x: 0, y: 0}}
				end={{x: 1, y: 1}}
				locations={[0, 1]}>
				<Image
					source={{uri: pokemon.sprites.regular}}
					style={{width: imageWidth, height: imageHeight}}
				/>
				<Text>{pokemon.name.fr}</Text>
			</LinearGradient>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	view: {
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		margin: 8,
	},
});


