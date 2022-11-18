import React, { useEffect } from 'react'
import { useState } from 'react'

export const Rows = ({ title, getUrl, isLargeRow }) => {
  const randomPic = 'https://previews.123rf.com/images/roxanabalint/roxanabalint1701/roxanabalint170100138/69079014-not-available-grunge-rubber-stamp-on-white-background-vector-illustration.jpg'
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
          <div className={`row-poster ${isLargeRow && "large-row"}`}>
            <img 
             src={`${baseUrl}${isLargeRow ? movie?.poster_path : movie?.backdrop_path}`} 
             key={movie.id} alt={movie.name} onClick={() => console.log(movie?.title || movie?.name || movie?.original_name)} />
            <div className='row-info'>
              {/* <img src={randomPic} /> */}
          
             <h4>{movie?.title || movie?.name || movie?.original_name}</h4>
             <p >{movie?.overview}</p>
            </div>   
            </div>
        ))}
      </div>
    </div>
   
  )
}
