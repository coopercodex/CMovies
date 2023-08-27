import { configureStore } from "@reduxjs/toolkit";

import favoriteReducer from "./components/redux/favoriteSlice";
import userReducer from "./components/redux/userSlice";
import movieSlice from "./components/redux/movieSlice";

export const store = configureStore({
  reducer: {
    movies: favoriteReducer,
    user: userReducer,
    movie: movieSlice,
  },
})