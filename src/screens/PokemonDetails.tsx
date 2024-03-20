import {Pokemon} from "../classes/Pokemon.ts";
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useRoute} from "@react-navigation/native";
import {GlobalStyles} from "../assets/globalStyles.ts";
import {useAppDispatch} from "../store/hooks.ts";
import {togglePokemonCaptured} from "../store/pokedexSlice.ts";
import {useSelector} from "react-redux";
import {RootState} from "../store/store.ts";
import React from "react";

type RouteParams = {
	pokemon: Pokemon;
}
export const PokemonDetails: React.FC = () => {
	const route = useRoute();
	const {pokemon} = route.params as RouteParams;
	const dispatch = useAppDispatch();
	const isCaptured: boolean = useSelector((state: RootState) => state.pokedexSlice.capturedPokemonList.includes(pokemon.pokedex_id));


	return (
		<View style={[GlobalStyles.horizontalCenter, GlobalStyles.verticalCenter]}>
			<Image
				source={{uri: pokemon.sprites.regular}}
				style={{width: 300, height: 300}}
			/>
			<Text>№ {pokemon.pokedex_id}</Text>
			<Text>Nom: {pokemon.name.fr}</Text>
			<Text>Génération: {pokemon.generation}</Text>
			<Text>Taille: {pokemon.height}</Text>
			<Text>Poids: {pokemon.weight}</Text>
			<Text>Catégorie: {pokemon.category}</Text>
			<FlatList
				scrollEnabled={false}
				data={pokemon.types}
				renderItem={({item}) => <Text>{item.name}</Text>}
				keyExtractor={(item, index: number) => item.name + index.toString()}
			/>
			<FlatList
				scrollEnabled={false}
				data={pokemon.talents}
				renderItem={({item}) => <Text>{item.name}</Text>}
				keyExtractor={(item, index: number) => item.name + index.toString()}
			/>

			<TouchableOpacity style={isCaptured ? styles.onStyle : styles.offStyle}
			                  onPress={() => dispatch(togglePokemonCaptured(pokemon.pokedex_id))}>
				<Text>{'Ajouter à l\'équipe'}</Text>
			</TouchableOpacity>
		</View>
	)
};

const styles = StyleSheet.create({
	onStyle: {
		backgroundColor: 'green',
	},
	offStyle: {
		backgroundColor: 'red',
	},
})

