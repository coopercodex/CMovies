import React, { useEffect } from 'react'
import { useState } from 'react'

import {IoIosArrowDropright, IoIosArrowDropleft} from 'react-icons/io'

export const Rows = ({ title, getUrl, isLargeRow, rID }) => {
  const [movies, setMovies] = useState([]);
  const baseUrl = "https://image.tmdb.org/t/p/original";
  

  const handleClickLeft = () => {
   let slider = document.getElementById('row' + rID);
   slider.scrollLeft = slider.scrollLeft - 500;
  }

  const handleClickRight = () => {
    let slider = document.getElementById('row' + rID);
    slider.scrollLeft = slider.scrollLeft + 500;
   }

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
      <div className='row-posters' id={'row'+ rID}>
        <IoIosArrowDropleft className='slider-icon-left' onClick={handleClickLeft} />
        {movies.map((movie, index) => (
          <div className={`row-poster ${isLargeRow && "large-row"}`}>
            <img 
             src={`${baseUrl}${isLargeRow ? movie?.poster_path : movie?.backdrop_path}`} 
             key={movie.id} alt={movie.name} onClick={() => console.log(movie?.title || movie?.name || movie?.original_name)} />
            <div className='row-info'>
          
             <h4>{movie?.title || movie?.name || movie?.original_name}</h4><br/>
             <p >{movie?.overview}</p>
            </div>   
            </div>
        ))}
        <IoIosArrowDropright className='slider-icon-right' onClick={handleClickRight}  />
      </div>
    </div>
   
  )
}
