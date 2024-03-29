import React from "react"
import { useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import ReactPlayer from "react-player"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { MdAddCircle } from "react-icons/md"
import { addToFavorite } from "./redux/favoriteSlice"
import "./moviedetails.css"
import { addMovieId } from "./redux/movieSlice"

export const MovieDetails = () => {
  const { state } = useLocation()
  const { movie } = state || {}
  const dispatch = useDispatch()
  const [video, setVideo] = useState([])
  const baseUrl = "https://image.tmdb.org/t/p/original"

  const getVideo = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movie?.id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => {
        setVideo(data?.results[0])
      })
  }

  useEffect(() => {
    dispatch(addMovieId(movie))
  }, [])

  useEffect(() => {
    getVideo()
  }, [movie])

  return (
    <div className="movie-details">
      <div className="movie-details-body">
        <div className="movie-info">
          <div className="video-title">
            <Link to="/">Home</Link> / {movie?.title}
          </div>
          {video?.key ? (
            <ReactPlayer
              className="react-player"
              url={`https://www.youtube.com/watch?v=${video?.key}`}
              controls={true}
              width="840px"
              height="460px"
            />
          ) : (
            <>
              <ReactPlayer url="https://www.youtube.com/watch?v=JLlNvOmznXk" />
            </>
          )}
        </div>
      </div>
      <div className="movie-description">
        <div className="movie-poster-container">
          <img src={`${baseUrl}${movie?.poster_path}`} alt="movie poster" />
          <MdAddCircle
            className="Add-fav-details"
            onClick={() => dispatch(addToFavorite(movie))}
            size={22}
          />
        </div>
        <div className="movie-description-details">
          <h1>{movie?.title || movie?.name || movie?.original_name}</h1>
          <div className="movie-description-tag">
            <p style={{ wordSpacing: 6 }}>
              <span className="hd">HD</span> ★{movie?.vote_average.toFixed(2)}{" "}
              {movie?.vote_count}votes{" "}
            </p>
            <p>{movie?.overview}</p>
            <p style={{ wordSpacing: 10 }}>
              Type: {movie?.media_type || "N/A"}
            </p>
            <p style={{ wordSpacing: 10 }}>
              Release: {movie?.release_date || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
