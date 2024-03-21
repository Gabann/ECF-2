import {FlatList, Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View} from 'react-native';
import {TabBar, TabView} from 'react-native-tab-view';
import React, {useEffect, useState} from 'react';
import {Pokemon} from '../classes/Pokemon.ts';
import {useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {GlobalStyles} from '../assets/globalStyles.ts';
import {togglePokemonCaptured} from '../store/collectionSlice.ts';
import {useAppDispatch, useAppSelector} from '../store/hooks.ts';
import {RootState} from '../store/store.ts';
import {PokemonDetailsAbout} from '../components/pokemonDetails/PokemonDetailsAbout.tsx';
import {PokemonDetailsStats} from '../components/pokemonDetails/PokemonDetailsStats.tsx';
import {PokemonDetailsEvolution} from '../components/pokemonDetails/PokemonDetailsEvolution.tsx';
import {TypeCard} from '../components/pokemonDetails/TypeCard.tsx';
import {typeColors} from '../assets/globals.ts';

type RouteParams = {
	pokemon: Pokemon;
}

const AboutRoute = ({pokemon}: { pokemon: Pokemon }) => (
	<PokemonDetailsAbout pokemon={pokemon}/>
);

const StatsRoute = ({pokemon}: { pokemon: Pokemon }) => (
	<PokemonDetailsStats pokemon={pokemon}/>
);

const EvolutionsRoute = ({pokemon}: { pokemon: Pokemon }) => (
	<PokemonDetailsEvolution pokemon={pokemon}/>
);

export const PokemonDetails = () => {
	const dispatch = useAppDispatch();
	const route = useRoute();
	const {pokemon} = route.params as RouteParams;
	const isCaptured: boolean = useAppSelector((state: RootState) => state.pokedexSlice.capturedPokemonList.includes(pokemon.pokedex_id));
	const [isShiny, setIsShiny] = React.useState(false);

	const renderScene = ({route: sceneRoute}: { route: { key: string } }) => {
		switch (sceneRoute.key) {
			case 'About':
				return <AboutRoute pokemon={pokemon}/>;
			case 'Stats':
				return <StatsRoute pokemon={pokemon}/>;
			case 'Evolutions':
				return <EvolutionsRoute pokemon={pokemon}/>;
			default:
				return null;
		}
	};

	const layout = useWindowDimensions();

	const [routeIndex, setRouteIndex] = useState(0);
	const [routes, setRoutes] = useState([
		{key: 'About', title: 'A propos'},
		{key: 'Stats', title: 'Statistiques'},
		{key: 'Evolutions', title: 'Evolutions'},
	]);

	useEffect(() => {
		if ((Object.keys(pokemon.stats).length <= 0)) {
			setRoutes(routes.filter(currentRoute => currentRoute.key !== 'Stats'));

		}
		if ((Object.keys(pokemon.evolution).length <= 0)) {
			setRoutes(routes.filter(currentRoute => currentRoute.key !== 'Evolutions'));
		}
	}, [pokemon]);

	function hexToRgba(hex: string, opacity: number) {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		if (result) {
			const r = parseInt(result[1], 16);
			const g = parseInt(result[2], 16);
			const b = parseInt(result[3], 16);
			return `rgba(${r}, ${g}, ${b}, ${opacity})`;
		}
		return '';
	}

	let backgroundColor = '';
	if (pokemon.types.length > 0) {
		backgroundColor = hexToRgba(typeColors[pokemon.types[0].name], 0.60);
	}

	return (
		<>
			<View style={[styles.container, {backgroundColor: backgroundColor}]}>
				<TouchableOpacity style={[styles.shinyButton]} onPress={() => {
					setIsShiny(!isShiny);
				}}>
					<Icon name={isShiny ? 'star' : 'star-outline'} size={20} color={'black'}/>
				</TouchableOpacity>

				<View style={GlobalStyles.horizontalCenter}>
					<Image
						source={{uri: isShiny ? pokemon.sprites.shiny : pokemon.sprites.regular}}
						style={{width: 300, height: 300}}/>
				</View>
				<TouchableOpacity
					style={isCaptured ? styles.onStyle : styles.offStyle}
					onPress={() => dispatch(togglePokemonCaptured(pokemon.pokedex_id))}>

					<Text>{isCaptured ? 'Retirer de la collection' : 'Ajouter a la collection'}</Text>

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
			</View>

			<TabView
				navigationState={{index: routeIndex, routes}}
				renderScene={renderScene}
				onIndexChange={setRouteIndex}
				initialLayout={{width: layout.width}}
				style={{backgroundColor: 'white', borderRadius: 10}}
				renderTabBar={props => <TabBar
					{...props}
					activeColor={'black'}
					inactiveColor={'lightgrey'}
					indicatorStyle={{backgroundColor: 'blue'}}
					style={{backgroundColor: 'white'}}/>}
			/>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10,
		backgroundColor: 'rgba(166,46,46,0.5)',
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
