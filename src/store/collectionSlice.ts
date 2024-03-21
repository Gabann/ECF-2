import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAllPokemons} from './apiSlice.ts';

export interface IPokedexSliceSate {
	capturedPokemonList: number[];
}

//BUG captured pokemon data is lost if a new pokemon is captured before running this function (done by loading the collection screen)
export const loadPokemonList = createAsyncThunk(
	'pokedex/loadPokemonList',
	async () => {
		const storedPokemons = await AsyncStorage.getItem('capturedPokemons');
		return storedPokemons ? JSON.parse(storedPokemons) : [];
	},
);

const initialState: IPokedexSliceSate = {
	capturedPokemonList: [],
};

const collectionSlice = createSlice({
	name: 'pokedexSlice',
	initialState,
	reducers: {
		togglePokemonCaptured: (state, action: PayloadAction<number>) => {
			if (state.capturedPokemonList.includes(action.payload)) {
				state.capturedPokemonList = state.capturedPokemonList.filter(pokemonId => pokemonId !== action.payload);
			} else {
				state.capturedPokemonList.push(action.payload);
			}

			AsyncStorage.setItem('capturedPokemons', JSON.stringify(state.capturedPokemonList)).then(() => {
			});
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getAllPokemons.pending, (state) => {
			state.capturedPokemonList = [];
		});
		builder.addCase(getAllPokemons.rejected, (state, action) => {
			console.error('Failed to get collected pokemons: ', action.error);
			state.capturedPokemonList = [];
		});
		builder.addCase(loadPokemonList.fulfilled, (state, action) => {
			state.capturedPokemonList = action.payload;
		});

	},
});

export const {togglePokemonCaptured} = collectionSlice.actions;
export default collectionSlice.reducer;
