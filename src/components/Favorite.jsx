import React from 'react'
import { RiDeleteBack2Fill } from 'react-icons/ri'
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io'
import { useSelector } from 'react-redux';
import { removeFromWatchList, selectItems } from './redux/favoriteSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export const Favorite = ({ isLargeRow }) => {
  const items = useSelector(selectItems)
  const dispatch = useDispatch()

  const baseUrl = "https://image.tmdb.org/t/p/original";

  const handleClickLeft = () => {
    let slider = document.getElementById('row');
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
          <h2 className='favorite-title'>Your Watchlist</h2>
          {items.length > 0 ? (
            <div id={'row'} className='row-posters-favorite' >
              <IoIosArrowDropleft className='slider-icon-left' onClick={handleClickLeft} />
              {items.map((movie, index) => (
                <div key={index} className={`row-poster ${isLargeRow && "large-row"}`}>
                  <img
                    src={`${baseUrl}${isLargeRow ? movie?.poster_path : movie?.backdrop_path}`}
                    key={movie.id} alt={movie.name} />
                  <div className='row-info'>
                    <h4>{movie?.title || movie?.name || movie?.original_name}</h4><br />
                    <h4 style={{ marginBottom: 5 }}>Remove from List? <RiDeleteBack2Fill className='remove-fav' onClick={() => dispatch(removeFromWatchList(movie.id))} /> </h4>
                    <Link to={`/movieDetails/${movie?.id}`} state={{ movie }}>
                      <p >{movie?.overview}</p>
                    </Link>
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
