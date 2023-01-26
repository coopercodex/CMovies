import React from 'react'
import { useRef } from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from 'firebase/auth';

function SignIn() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const email = 'cmovies@gmail.com'
  const password = 'cmovies123'
  const register = (event) => {
    event.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
    .then((userCredential) => {
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
  })
  .catch((err) => {
    alert(err.message);
  });
  }

  return (
    <div className='signIn-screen'>
      <form>
        <h1>Sign In</h1>
        <input ref={emailRef} placeholder='Email' type='email' value={email} />
        <input ref={passwordRef} placeholder='Password' type='password' value={password} />
        <button type='submit' onClick={signIn}>Sign In</button>
        <h4>
          <span className='signIn-gray'>New to CmMovies? </span>
          <span className='signIn-link' onClick={register}>Sign Up Now</span> 
          <h3 className='message' >(Just click Sign In! Click sign up to see Firebase...well fire!)</h3>
        </h4>
      </form>
      </div>
  )
}

export default SignIn