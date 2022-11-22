import React, { useState, useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import {MdAddCircle} from 'react-icons/md'
import requests from '../requests'

export const Searchbar = ({ movie }) => {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([]);
  const baseUrl = "https://image.tmdb.org/t/p/original";

  const { addMovieToWatchList, watchlist } = useContext(GlobalContext)

  const handleChange = (event) => {
    event.preventDefault();
    setSearch(event.target.value)

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=b558000a72a27464bb4bdad6fff63ac2&language=en-US&page=1&include_adult=false&query=${event.target.value}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.errors) {
          setResults(data.results);
        } else {
          setResults([]);
        }
      })
  }

  return (

    <div className='search'>
      <input
        type='text'
        placeholder='Search Movies...'
        value={search}
        onChange={handleChange}
      />
      {results.length > 0 && (
        <ul className='res'>
          {results.map((movie) => (
            <li className='list-item' key={movie?.id}>
              {movie.poster_path &&
                <img key={movie.id} src={`${baseUrl}${movie?.poster_path}` || `${baseUrl}${movie?.backdrop_path}`} />
              }
              <div>
                <h3>{movie?.title}</h3>
                <p>{movie.release_date ? movie.release_date.slice(0, 4) : 'No Info'}
                <h4>Add to List? <MdAddCircle onClick={() => addMovieToWatchList(movie)} /> </h4>
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>

  )
}
