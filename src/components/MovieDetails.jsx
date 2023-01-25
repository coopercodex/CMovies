import React from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { useState } from 'react'

export const MovieDetails = () => {
  const { state } = useLocation()
  const { movie } = state || {}
  const [video, setVideo] = useState([])
  const baseUrl = "https://image.tmdb.org/t/p/original";

  const getVideo = () => {
    fetch(`https://api.themoviedb.org/3/movie/${movie?.id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        setVideo(data?.results[0])
      })
  }
  useEffect(() => {
    getVideo()
  }, [])
  // console.log(video)

  return (
    <div className='movie-details'>
      <div className='movie-details-body'>
        <div className='movie-info'>
          {video?.key ? (
            <ReactPlayer url={`https://www.youtube.com/watch?v=${video?.key}`} />
          ) : <>
            <ReactPlayer url='https://www.youtube.com/watch?v=JLlNvOmznXk' />
          </>
          }
          <img src={`${baseUrl}${movie?.poster_path}`} />
        </div>
      </div>
    </div>
  )
}
