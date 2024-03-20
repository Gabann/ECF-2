import {Pokemon} from "../classes/Pokemon.ts";
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity} from "react-native";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "../../App.tsx";
import React from "react";
import LinearGradient from 'react-native-linear-gradient';
import {typeColors} from "../assets/globals.ts";


type Props = {
	pokemon: Pokemon;
}
export const PokemonCard: React.FC<Props> = ({pokemon}) => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();

	function handlePress(): void {
		navigation.navigate('PokemonDetails', {
			pokemon: pokemon,
		});
	}

	let colors = ['#FFFFFF', '#FFFFFF'];

	colors[0] = typeColors[pokemon.types[0].name];
	if (pokemon.types.length < 2) {
		colors[1] = colors[0];
	} else {
		colors[1] = typeColors[pokemon.types[1].name];
	}

	return (
		<TouchableOpacity onPress={handlePress}>
			<LinearGradient
				colors={colors}
				style={styles.view}
				start={{x: 0, y: 0}}
				end={{x: 1, y: 1}}
				locations={[0, 1]}>
				<Image
					source={{uri: pokemon.sprites.regular}}
					style={{width: 120, height: 120}}
				/>
				<Text>{pokemon.name.fr}</Text>
			</LinearGradient>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	view: {
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		margin: 8,
		width: Dimensions.get('window').width * 0.28,
	},
});


