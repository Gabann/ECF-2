import {Pokemon} from "../classes/Pokemon.ts";
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "../../App.tsx";

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

	return (
		<TouchableOpacity onPress={handlePress}>
			<View style={styles.view}>
				<Image
					source={{uri: pokemon.sprites.regular}}
					style={{width: 120, height: 120}}
				/>
				<Text>{pokemon.name.fr}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	view: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'pink',
		borderRadius: 10,
		margin: 8,
		width: Dimensions.get('window').width * 0.28,
	},
});


