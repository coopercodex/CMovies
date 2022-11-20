import React, { useEffect, useState } from 'react'
import {Routes, Route, Link} from 'react-router-dom'
import { Favorite } from './Favorite';
import { Searchbar } from './Searchbar';

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
    <>
    <div className={`navbar ${show && 'navbar-black'}`}>
      <Link to='/'><h1 className='navbar-title'>CMovies</h1></Link>
      <div className='searchbar'><Searchbar /></div>
    </div>
    </>
  )
}
