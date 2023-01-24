import userEvent from '@testing-library/user-event';
import React from 'react'
import { useRef } from 'react';
import  {auth}  from '../firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from 'firebase/auth';

function SignIn() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  
  const register = (event) => {
    event.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
    .then((userCredential) => {
      const user = userCredential.user;
      // console.log(user)
    })
    .catch((err) => {
      alert(err.message);
    })
  }

  const signIn = (event) => {
    event.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user)
  })
  .catch((err) => {
    alert(err.message);
  });
  }

  return (
    <div className='signIn-screen'>
      <form>
        <h1>Sign In</h1>
        <input ref={emailRef} placeholder='Email' type='email' />
        <input ref={passwordRef} placeholder='Password' type='password' />
        <button type='submit' onClick={signIn}>Sign In</button>
        <h4>
          <span className='signIn-gray'>New to CmMovies? </span>
          <span className='signIn-link' onClick={register}>Sign Up Now</span>
        </h4>
      </form>
    </div>
  )
}

export default SignIn