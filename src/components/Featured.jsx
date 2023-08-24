import React, { useEffect, useState } from 'react'
import requests from '../requests';
import { Link } from 'react-router-dom';
import './featured.css'

export const Featured = () => {
  const [movie, setMovies] = useState([])
  const [topTen, setTopTen] = useState([])

  const getData = () => {
    fetch(requests.getAdventure)
      .then(response => response.json())
      .then(data => { setMovies(data.results[Math.floor(Math.random() * data.results.length - 1)]) })
      .catch(error => { console.log(error) })
  }

  const getTopTen = () => {
    fetch('https://api.themoviedb.org/3/discover/tv?api_key=b558000a72a27464bb4bdad6fff63ac2&include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200')
    .then(res => res.json())
    .then(data => {
      setTopTen(data.results.slice(0, 10))
    })
    .catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    getData()
    getTopTen()
  }, [])


  return (
    <header className='featured'
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`, backgroundPosition: "center center",
      }}
      >
      <div className='featured-movies'>
        {/* {console.log(topTen)} */}
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
      <div>
        <h3 className='top-ten'>Top Ten</h3>
      </div>
    </header>
  )
}
