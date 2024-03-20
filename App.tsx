import React from 'react';
import {Provider} from "react-redux";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {store} from "./src/store/store.ts";
import {PokedexView} from "./src/screens/PokedexView.tsx";
import {PokemonList} from "./src/screens/PokemonList.tsx";
import {Debug} from "./src/components/Debug.tsx";
import {Pokemon} from "./src/classes/Pokemon.ts";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {PokemonDetails} from "./src/screens/PokemonDetails.tsx";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator()

export type RootStackParamList = {
	PokemonDetails: {
		pokemon: Pokemon;
	};
};

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
							name='PokemonList'
							component={PokemonList}
							options={{
								tabBarLabel: "Pokemon list"
							}}
						/>
						<Tab.Screen
							name='PokedexView'
							component={PokedexView}
							options={{
								tabBarLabel: "My pokedex"
							}}
						/>
						<Tab.Screen
							name='PokemonDetails'
							component={PokemonDetails}
						/>
					</Tab.Navigator>
				</Provider>
			</NavigationContainer>
			<Debug/></>
	)
}
