import React from 'react'
import { useRef } from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from 'firebase/auth';

function SignIn() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  
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
        <input ref={emailRef} placeholder='abc@gmail.com' type='email' />
        <input ref={passwordRef} placeholder='abc123' type='password' />
        <button type='submit' onClick={signIn}>Sign In</button>
        <h4>
          <span className='signIn-gray'>New to CmMovies? </span>
          <span className='signIn-link' onClick={register}>Sign Up Now</span> 
          <h3 className='message'>(Any fake gmail and password will work)</h3>
        </h4>
      </form>
    </div>
  )
}

export default SignIn