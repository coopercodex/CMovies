import React from 'react'
import { useState } from 'react'
import SignIn from './SignIn'

function Login() {
  const [signIn, setSignIn] = useState(false)

  return (
    <div className='login-screen'>
      <div className='login-background'>
        <h1 className='login-title'>CMovies</h1>
        <button className='login-button'>Sign In</button>
        <div className='login-gradient'>
        </div>
        <div className='login-body'>
          {signIn ? (
            <SignIn /> 
          ) : (
            <>
            <h1>Unlimited Films, TV and more...</h1>
            <h2>Watch anywhere. Cancel at any time.</h2>
            <h3>Ready to watch? Enter your email to create a membership</h3>
            <div className='login-input'>
              <form>
                <input type='email' placeholder='Email' />
                <button className='login-getStarted' onClick={() => setSignIn(true)}>Get Started</button>
              </form>
            </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login