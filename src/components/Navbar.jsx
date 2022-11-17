import React, { useEffect, useState } from 'react'

export const Navbar = () => {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        handleShow(true); 
      } else {
        handleShow(false)
      }
    })
    return () => {
      window.removeEventListener('scroll')
    }
  },[])

  return (
    <div className={`navbar ${show && 'navbar-black'}`}>
      <h1 className='navbar-title'>CMovies</h1>
    </div>
  )
}
