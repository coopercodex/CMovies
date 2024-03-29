import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: []
}

export const favoriteSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addToFavorite: (state, action) => {
      const item = state.movies.find((movie) => movie.id === action.payload.id)
      if (!item) {
        state.movies.push(action.payload)
      } 
    },
    removeFromWatchList: (state, action) => {
      state.movies = state.movies.filter(item => item.id !== action.payload)
    },
  },
}) 

export const { addToFavorite, removeFromWatchList } = favoriteSlice.actions;
export const selectItems = (state) => state.movies.movies;
export default favoriteSlice.reducer;