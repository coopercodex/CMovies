import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  movie: {},
}

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    addMovieId: (state, action) => {
    state.movie = action.payload
     
    },
  },
})

export const { addMovieId } = movieSlice.actions
export const selectMovie = (state) => state.movie.movie
export default movieSlice.reducer
