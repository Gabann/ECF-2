import {Pokemon} from "../classes/Pokemon.ts";
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useRoute} from "@react-navigation/native";
import {useAppDispatch} from "../store/hooks.ts";
import {togglePokemonCaptured} from "../store/pokedexSlice.ts";
import {useSelector} from "react-redux";
import {RootState} from "../store/store.ts";
import React from "react";
import {GlobalStyles} from "../assets/globalStyles.ts";
import {TypeCard} from "../components/TypeCard.tsx";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

type RouteParams = {
	pokemon: Pokemon;
}
export const PokemonDetails: React.FC = () => {
	const route = useRoute();
	const {pokemon} = route.params as RouteParams;
	const dispatch = useAppDispatch();
	const isCaptured: boolean = useSelector((state: RootState) => state.pokedexSlice.capturedPokemonList.includes(pokemon.pokedex_id));


	return (
		<View style={styles.container}>
			<TouchableOpacity style={[styles.topRightButton, isCaptured ? styles.onStyle : styles.offStyle]}
			                  onPress={() => dispatch(togglePokemonCaptured(pokemon.pokedex_id))}>
				<Text>Top Right</Text>
			</TouchableOpacity>

			<View style={GlobalStyles.horizontalCenter}>
				<Image
					source={{uri: pokemon.sprites.regular}}
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

			<View>
				<Icon name="weight" size={20} color={'black'}/><Text>{pokemon.weight}</Text>
				<Icon name="arrow-expand-vertical" size={20} color={'black'}/><Text>{pokemon.height}</Text>
				<Icon name="format-list-bulleted-square" size={20} color={'black'}/><Text>{pokemon.category}</Text>
				<Icon name="pokeball" size={20} color={'black'}/><Text>{pokemon.talents.map(talent => talent.name).join()}</Text>
			</View>
		</View>
	)
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
	topRightButton: {
		position: 'absolute',
		top: 0,
		right: 0,
	},
})

