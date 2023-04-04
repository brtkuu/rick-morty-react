import { createSlice } from '@reduxjs/toolkit';

interface FavoritesState {
	favorites: Array<Number>
}

const initialState: FavoritesState = {
	favorites: []
}

export const favoritesSlice = createSlice({
  name: "favorites",
	initialState,
  reducers: {
    ADD_FAVORITE: (state: any, action) => {
			state.favorites.push(action.payload);
    },
		REMOVE_FAVORITE: (state: any, action) => {
			state.favorites = [...state.favorites].filter(ele => ele !== action.payload);
		}
  }
});

// Action creators are generated for each case reducer function
export const { ADD_FAVORITE, REMOVE_FAVORITE } = favoritesSlice.actions;

export default favoritesSlice.reducer;

