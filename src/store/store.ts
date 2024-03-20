import {configureStore} from "@reduxjs/toolkit";
import apiSlice from "./apiSlice.ts";
import pokedexSlice from "./pokedexSlice.ts";

export const store = configureStore({
	reducer: {
		apiSlice: apiSlice,
		pokedexSlice: pokedexSlice
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
