import React, { useState } from 'react'
import {MdAddCircle} from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { addToFavorite } from './redux/favoriteSlice'

export const Searchbar = () => {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([]);
  const baseUrl = "https://image.tmdb.org/t/p/original";
  const dispatch = useDispatch();

  const handleChange = (event) => {
    event.preventDefault();
    setSearch(event.target.value)

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&include_adult=false&query=${event.target.value}`)
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
                <img key={movie.id} src={`${baseUrl}${movie?.poster_path}` || `${baseUrl}${movie?.backdrop_path}`} alt='movie poster' />
              }
              <div>
                <h3>{movie?.title}</h3>
                <p>{movie.release_date ? movie.release_date.slice(0, 4) : 'No Info'}
                <h4>Add to List? <MdAddCircle onClick={() => dispatch(addToFavorite(movie))} /> </h4>
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>

  )
}
