import React from 'react'
import { useSelector } from 'react-redux'
import { getAuth, signOut } from "firebase/auth";
import { selectUser } from './redux/userSlice'
import { auth } from '../firebase';

export const Profile = () => {
  const user = useSelector(selectUser)

  // const getOut = () => {
  //   const auth = getAuth();
  //   signOut(auth).then(() => {
  //     console.log('signed out')
  //   }).catch((error) => {
  //     alert(error.message)
  //   });
  // }

  return (
    <div className='profile-screen'>
      <div className='profile-body'>
          <h1>Edit Profile</h1>
        <div className='profile-info'>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmX1IYrleu5pZkTWvD6cBrp4E0knysir8f-A&usqp=CAU' alt='profile-icon' />
          <div className='profile-details'>
            <h2>{user.email}</h2>
            <div className='profile-plans'>
              <h3>Plans</h3>
              <button onClick={() => auth.signOut()} className='profile-signOut'>Sign Out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
