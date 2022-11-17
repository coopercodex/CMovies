import React, { useEffect, useState } from 'react'
import requests from '../requests';

export const Featured = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getData()

  }, [])

  const getData = async () => {
    await fetch(requests.getNetflixOriginals)
      .then(response => response.json())
      .then(data => { setMovies(data.results[Math.floor(Math.random() * data.results.length - 1)]) })
      .catch(error => { console.log(error) })
  }
  // console.log(movies)
  return (
    <header className='featured'
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url(
        "https://image.tmdb.org/t/p/original/${movies?.backdrop_path}")`, backgroundPosition: "center center",
      }}>
      <div className='featured-movies'>
        <h1 className='featured-title'>
          {movies?.title || movies?.name || movies?.original_name}
        </h1>
      <div className="featured-buttons">
          <button className="featured-button">Play</button>
          <button className="featured-button">My List</button>
      </div>
        <h1 className='featured-description'>
          {movies.overview}
        </h1>
      </div>
      <div className='fade-bottom'/>

    </header>
  )
}
