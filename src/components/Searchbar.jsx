import React, { useState } from 'react'
import requests from '../requests'
export const Searchbar = () => {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([]);
  const baseUrl = "https://image.tmdb.org/t/p/original";
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

  console.log("res", results)
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
            <li className='list-item'>
            {movie.poster_path &&
              <img src={`${baseUrl}${movie?.poster_path}` || `${baseUrl}${movie?.backdrop_path}`} />
            }
            <div>
            <h3>{movie?.title}</h3>
            <p>{movie.release_date ? movie.release_date.slice(0,4) : 'No Info'}
            <button className='sbutton'>Add</button>
            </p>
            </div>
            </li>
          ))}
        </ul>
      )}
      </div>

  )
}
