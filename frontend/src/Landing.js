import React from 'react'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()

  const onButtonClickLogin = () => {
    if (user) {
      localStorage.removeItem('user')
      navigate('/')
    } else {
      navigate('/login')
    }
  }

  const onButtonClickSignup = () => {
    if (user) {
      window.alert("You are logged in")
    } else {
      navigate('/register')
    }
  }

  return (
    <div className="mainContainer">
      <div className={'buttonContainer'}>
        <input
          className={'inputButton'}
          type="button"
          onClick={onButtonClickLogin}
          value={user ? 'Log out' : 'Log in'}
        />
        {user ? <div>Your email address is {user.email}</div> : <div />}
      </div>

      <div className={'buttonContainer'}>
        <input
          className={'inputButton'}
          type="button"
          onClick={onButtonClickSignup}
          value={'Sign up'}
        />
      </div>
    </div>
  )
}

export default Landing
