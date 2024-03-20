import React from 'react';
import {Provider} from "react-redux";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {store} from "./src/store/store.ts";
import {PokedexView} from "./src/screens/PokedexView.tsx";
import {Debug} from "./src/components/Debug.tsx";
import {Pokemon} from "./src/classes/Pokemon.ts";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {PokemonDetails} from "./src/screens/PokemonDetails.tsx";
import {PokemonCollectionView} from "./src/screens/PokemonCollectionView.tsx";

const PokedexStack = createNativeStackNavigator();
const CollectionStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator()

export type RootStackParamList = {
	PokemonDetails: {
		pokemon: Pokemon;
	};
};

function PokedexScreen() {
	return (
		<PokedexStack.Navigator
			screenOptions={{headerShown: false}}>
			<PokedexStack.Screen name="PokedexView" component={PokedexView}/>
			<PokedexStack.Screen name="PokemonDetails" component={PokemonDetails}/>
		</PokedexStack.Navigator>
	);
}

function PokemonCollectionScreen() {
	return (
		<PokedexStack.Navigator
			screenOptions={{headerShown: false}}>
			<PokedexStack.Screen name="PokemonCollection" component={PokemonCollectionView}/>
			<PokedexStack.Screen name="PokemonDetails" component={PokemonDetails}/>
		</PokedexStack.Navigator>
	);
}

export default function App(): React.JSX.Element {
	return (
		<>
			<NavigationContainer>
				<Provider store={store}>
					<Tab.Navigator screenOptions={{
						tabBarActiveTintColor: "blue",
						headerShown: false
					}}>
						<Tab.Screen
							name='Pokedex'
							component={PokedexScreen}
							options={{
								tabBarLabel: "Pokedex"
							}}
						/>
						<Tab.Screen
							name='PokemonCollection'
							component={PokemonCollectionScreen}
							options={{
								tabBarLabel: "My collection"
							}}
						/>
					</Tab.Navigator>
				</Provider>
			</NavigationContainer>
			<Debug/></>
	)
}
