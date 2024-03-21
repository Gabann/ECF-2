import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Pokemon} from '../classes/Pokemon.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiBaseUrl: string = 'https://tyradex.vercel.app/api/v1/';

export interface IPokemonSliceSate {
	pokemonList: Pokemon[];
}

const initialState: IPokemonSliceSate = {
	pokemonList: [],
};

async function formatApiResponse(response: Response): Promise<Pokemon[]> {
	let results: Pokemon[] = [];
	let data = await response.json();

	if (!Array.isArray(data)) {
		return data;
	}

	for (let pokemon of data) {
		let currentPokemon: Pokemon = new Pokemon(
			pokemon.pokedex_id || 0,
			pokemon.generation || 0,
			pokemon.category || '',
			pokemon.name || {},
			pokemon.sprites || {},
			pokemon.types || [],
			pokemon.talents || [],
			pokemon.stats || {},
			pokemon.resistances || [],
			pokemon.evolution || {},
			pokemon.height || 0,
			pokemon.weight || 0,
			pokemon.egg_group || [],
			pokemon.sexe || {},
			pokemon.catch_rate || 0,
			pokemon.level_100 || 0,
			pokemon.form || '',
		);
		results.push(currentPokemon);
	}

	return results;
}

export const getAllPokemons = createAsyncThunk(
	'pokemon/getAllPokemons',
	async (_) => {
		let storedPokemons: string | null = await AsyncStorage.getItem('allPokemons');
		if (storedPokemons) {
			return JSON.parse(storedPokemons);
		} else {
			try {
				let response = await fetch(apiBaseUrl + 'pokemon');
				let formattedResponse: Pokemon[] = await formatApiResponse(response);
				await AsyncStorage.setItem('allPokemons', JSON.stringify(formattedResponse));
				return formattedResponse;
			} catch (e) {
				console.error(e);
			}
		}
	},
);

const apiSlice = createSlice({
	name: 'apiSlice',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getAllPokemons.pending, (state) => {
			state.pokemonList = [];
		});
		builder.addCase(getAllPokemons.rejected, (state, action) => {
			console.error('Failed to get all pokemons: ', action.error);
			state.pokemonList = [];
		});
		builder.addCase(getAllPokemons.fulfilled, (state, action) => {
			state.pokemonList = Object.values(action.payload);
		});
	},
});
export default apiSlice.reducer;
