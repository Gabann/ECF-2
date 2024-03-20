import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface IPokedexSliceSate {
	capturedPokemonList: number[]
}

export const loadPokemonList = createAsyncThunk(
	'pokedex/loadPokemonList',
	async () => {
		console.log('loading pokemon list')
		const storedPokemons = await AsyncStorage.getItem('capturedPokemons');
		return storedPokemons ? JSON.parse(storedPokemons) : [];
	}
);

const initialState: IPokedexSliceSate = {
	capturedPokemonList: []
}

const pokedexSlice = createSlice({
	name: 'pokedexSlice',
	initialState,
	reducers: {
		addPokemonToList: (state, action: PayloadAction<number>) => {
			state.capturedPokemonList.push(action.payload);
		},
		togglePokemonCaptured: (state, action: PayloadAction<number>) => {
			if (state.capturedPokemonList.includes(action.payload)) {
				state.capturedPokemonList = state.capturedPokemonList.filter(pokemonId => pokemonId !== action.payload);
			} else {
				state.capturedPokemonList.push(action.payload);
			}
		}
	},
	extraReducers: (builder) => {
		builder.addCase(loadPokemonList.fulfilled, (state, action) => {
			state.capturedPokemonList = action.payload;
		});
	},
});

export const {addPokemonToList, togglePokemonCaptured} = pokedexSlice.actions;
export default pokedexSlice.reducer;
