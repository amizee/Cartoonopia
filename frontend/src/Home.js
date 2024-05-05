import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = (props) => {
  const { loggedIn, email } = props
  const navigate = useNavigate()

  const onButtonClickLogin = () => {
    if (loggedIn) {
        localStorage.removeItem('user')
        props.setLoggedIn(false)
      } else {
        navigate('/login')
      }
  }

  const onButtonClickSignup = () => {
    if (loggedIn) {
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
          value={loggedIn ? 'Log out' : 'Log in'}
        />
        {loggedIn ? <div>Your email address is {email}</div> : <div />}
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

export default Home