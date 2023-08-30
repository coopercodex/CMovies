import React, { useEffect, useState } from "react"
import "./comments.css"
import { selectMovie } from "./redux/movieSlice"
import { useSelector } from "react-redux"
import { BiSolidCommentDots } from "react-icons/bi"
import { BiLike } from "react-icons/bi"
import moment from "moment"
import CommentForm from "./CommentForm"

const Comments = () => {
  const [comments, setComments] = useState()
  const [like, setLike] = useState(0)
  const item = useSelector(selectMovie)

  const getData = () => {
    fetch(process.env.REACT_APP_API_URL)
      .then((res) => res.json())
      .then((data) => {
        setComments(data)
      })
  }
  const movieComments = () => {
    return comments?.reduce((acc, comment) => {
      if (comment?.movieId === item?.id) {
        acc.push(comment)
      }
      return acc
    }, [])
  }
  const chat = movieComments()
  
  useEffect(() => {
    getData()
  }, [])

  const sortedDate = () => {
    const x = chat?.sort((a, b) => {
      return a.createdAt - b.createdAt
    })
    return x
  }
  const sorted = sortedDate()?.reverse()

  const getDate = () => {
    const d = sorted?.map((c) => {
      var timeStamp = new Date(c.createdAt)
      var date = moment(timeStamp).fromNow()
      return date
    })
    return d
  }

  const handleEdit = (id,likes) => {
    const editedComment = {
      id,
      likes,
    }
    fetch(`${process.env.REACT_APP_API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedComment),
    }).then((res) => res.json())
  }

  return (
    <div className="comments">
      <h2>
        <span>
          <BiSolidCommentDots color="rgb(77, 194, 223)" />
        </span>
        Comments
      </h2>
      <div className="content">
        <h4>{chat?.length} Comments</h4>
      </div>
      <CommentForm getData={getData} />
      <div className="messages">
        {chat?.map((comment, index) => (
          <div className="user-comments" key={index}>
            <img
              src={
                comment.userPhoto
                  ? comment.userPhoto
                  : "data:image/png;base64,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"
              }
              height={50}
              style={{ objectFit: "contain", width: 50, borderRadius: 10 }}
            />
            <div className="comment-details">
              <h4>{comment.userName}</h4>
              <h5>{getDate()[index]}</h5>
              <p>{comment.description}</p>
              <p>
                <BiLike
                  onClick={() => {
                    setLike(comment.likes+=1)
                    handleEdit(comment.id, comment.likes)
                  }}
                  className="like"
                />
                <span style={{ fontSize: 14 }}>{comment.likes}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Comments
