import React, { useEffect, useState } from 'react'
import requests from '../requests';
import { Link } from 'react-router-dom';

export const Featured = () => {
  const [movie, setMovies] = useState([]);

  const getData = () => {
       fetch(requests.getAdventure)
      .then(response => response.json())
      .then(data => { setMovies(data.results[Math.floor(Math.random() * data.results.length - 1)]) })
      .catch(error => { console.log(error) })
  }

  useEffect(() => {
    getData()
  }, [])


  return (
    <header className='featured'
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url(
        "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`, backgroundPosition: "center center",
      }}>
      <div className='featured-movies'>
        <h1 className='featured-title'>
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="featured-buttons">
        <Link to={`/movieDetails/${movie?.id}`} state={{ movie }} className="featured-button">Play</Link>
          <Link to='/favorite'><button className="featured-button-list">My List</button></Link>
        </div>
        <h1 className='featured-description'>
          {movie?.overview}
        </h1>
      </div>
      <div className='fade-bottom' />

    </header>
  )
}
