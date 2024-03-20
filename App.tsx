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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


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
		<PokedexStack.Navigator>
			<PokedexStack.Screen name="PokedexView" component={PokedexView} options={{headerShown: false}}/>
			<PokedexStack.Screen name="PokemonDetails" component={PokemonDetails}/>
		</PokedexStack.Navigator>
	);
}

function PokemonCollectionScreen() {
	return (
		<CollectionStack.Navigator>
			<CollectionStack.Screen name="PokemonCollection" component={PokemonCollectionView} options={{headerShown: false}}/>
			<CollectionStack.Screen name="PokemonDetails" component={PokemonDetails}/>
		</CollectionStack.Navigator>
	);
}

export default function App(): React.JSX.Element {
	return (
		<>
			<NavigationContainer>
				<Provider store={store}>
					<Tab.Navigator screenOptions={{
						tabBarActiveTintColor: "red",
						headerShown: false
					}}>
						<Tab.Screen
							name='PokedexTab'
							component={PokedexScreen}
							options={{
								tabBarLabel: "Pokedex",
								tabBarIcon: ({color, size}) => (<Icon name="pokeball" size={size} color={color}/>),
							}}
						/>
						<Tab.Screen
							name='PokemonCollectionTab'
							component={PokemonCollectionScreen}
							options={{
								tabBarLabel: "My collection",
								tabBarIcon: ({color, size}) => (<Icon name="folder" size={size} color={color}/>)
							}}
						/>
					</Tab.Navigator>
				</Provider>
			</NavigationContainer>
			<Debug/></>
	)
}
