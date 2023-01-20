import React from 'react'

function SignIn() {

  const register = (event) => {
    event.preventDefault();
  }
  const signIn = (event) => {
    event.preventDefault();
  }

  return (
    <div className='signIn-screen'>
      <form>
        <h1>Sign In</h1>
        <input placeholder='Email' type='email' />
        <input placeholder='Password' type='password' />
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