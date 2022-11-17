import React, { useEffect } from 'react'
import { useState } from 'react'

export const Rows = ({ title, getUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const baseUrl = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    getData()

  }, [getUrl])

  const getData = async () => {
    await fetch(getUrl)
      .then(response => response.json())
      .then(data => { setMovies(data.results) })
      .catch(error => { console.log(error) })
  }

  // console.table(movies[0].poster_path)
  return (
    <div className='row'>
      <h2>{title}</h2>
      <div className='row-posters'>
        {movies.map((movie, index) => (
          <img className={`row-poster ${isLargeRow && "large-row"}`} src={`${baseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} key={movie.id} alt={movie.name} />

        ))}

      </div>
    </div>
  )
}
