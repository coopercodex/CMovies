import React, { useEffect } from 'react'
import { useState } from 'react'
import { MdAddCircle } from 'react-icons/md'
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io'
import { useDispatch } from 'react-redux';
import { addToFavorite } from './redux/favoriteSlice';

export const Rows = ({ title, getUrl, isLargeRow, rID }) => {
  const [movies, setMovies] = useState([]);
  const dispatch = useDispatch();
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


  return (
    <>
      <div className='row'>
        <h2>{title}</h2>
        <div id={'row' + rID} className='row-posters' >
          <IoIosArrowDropleft className='slider-icon-left' onClick={handleClickLeft} />
          {movies?.map((movie, index) => (
            <div key={movie?.id} className={`row-poster ${isLargeRow && "large-row"}`}>
              <img
                src={`${baseUrl}${isLargeRow ? movie?.poster_path : movie?.backdrop_path }`}
                key={movie?.id} alt={movie?.name} />
              <div className='row-info'>
                <h4>{movie?.title || movie?.name || movie?.original_name}</h4><br />
                <h4>Add to List? <MdAddCircle onClick={() => dispatch(addToFavorite(movie))} /> </h4>
                <p >{movie?.overview}</p>
              </div>
            </div>
          ))}
          <IoIosArrowDropright className='slider-icon-right' onClick={handleClickRight} />
        </div>
      </div>
    </>
  )
}
