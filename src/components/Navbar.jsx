import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Searchbar } from './Searchbar';

export const Navbar = () => {
  const [show, handleShow] = useState(false);

  const transition = () => {
    if (window.scrollY > 50) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', transition)
    return () =>
      window.removeEventListener('scroll', transition)
  }, [])

  return (
    <>
      <div className={`navbar ${show && 'navbar-black'}`}>
        <Link to='/'><h1 className='navbar-title'>CMovies</h1></Link>
        <Link to='/' className="home-button">Home</Link>
        <Link to='/favorite' className="home-button">Watchlist</Link>
        <Link to='/profile'><img className='navbar-avatar' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmX1IYrleu5pZkTWvD6cBrp4E0knysir8f-A&usqp=CAU' alt='profile-icon' /> </Link>
        <div className='searchbar'><Searchbar /></div>
      </div>
    </>
  )
}
