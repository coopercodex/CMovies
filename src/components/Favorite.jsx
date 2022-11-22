import React from 'react'
import YouTube from 'react-youtube'
import {RiDeleteBack2Fill} from 'react-icons/ri'
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io'
import { Searchbar } from './Searchbar';
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Favorite = ({ isLargeRow }) => {
  const { watchlist, removeMovieFromWatchlist } = useContext(GlobalContext)
  const baseUrl = "https://image.tmdb.org/t/p/original";

  const handleClickLeft = () => {
    let slider = document.getElementById('row' );
    slider.scrollLeft = slider.scrollLeft - 500;
  }

  const handleClickRight = () => {
    let slider = document.getElementById('row');
    slider.scrollLeft = slider.scrollLeft + 500;
  }

  return (
    <>
      <div className='favorite'>
        <div className='row'>
          <h2 className='favorite-title'>Favorites</h2>
          {watchlist.length > 0 ? (

            <div id={'row'} className='row-posters-favorite' >
              <IoIosArrowDropleft className='slider-icon-left' onClick={handleClickLeft} />
              {watchlist.map((movie, index) => (
                <div className={`row-poster ${isLargeRow && "large-row"}`}>
                  <img
                    src={`${baseUrl}${isLargeRow ? movie?.poster_path : movie?.backdrop_path}`}
                    key={movie.id} alt={movie.name} />
                  <div className='row-info'>
                    <h4>{movie?.title || movie?.name || movie?.original_name}</h4><br />
                  <h4 style={{color: 'red'}}>Remove from List? <RiDeleteBack2Fill onClick={() => removeMovieFromWatchlist(movie.id)} /> </h4>
                    <p >{movie?.overview}</p>
                  </div>
                </div>
              ))}
                   <IoIosArrowDropright className='slider-icon-right' onClick={handleClickRight} />
            </div>
          ) : (<h1 className='favorite-title'>No Favorites added!</h1>)}
        </div>

      </div>
    </>
  )
}
