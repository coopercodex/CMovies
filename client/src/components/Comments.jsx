import React, { useEffect, useState } from "react"
import { selectMovie } from "./redux/movieSlice"
import { useSelector } from "react-redux"

const Comments = () => {
  const [comments, setComments] = useState()
  const item = useSelector(selectMovie)
  // console.log(item)

  const getData = () => {
    fetch(
      ``
    )
      .then((res) => res.json())
      .then((data) => {
       setComments(data)
      })
  }
  const movieComments = () => {
    const getComments = comments?.reduce((acc, comment) => {
      if (comment?.movieId === item?.id) {
        acc.push(comment)
      }
      return acc
    },[])
    return getComments
  }

  useEffect(() => {
    getData()
  }, [])

console.log(movieComments())

  return <div>Comments</div>
}

export default Comments
