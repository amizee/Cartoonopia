import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LandingCSS from './Landing.css';

const Landing = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const onButtonClickLogin = () => {
    if (user) {
      localStorage.removeItem('user');
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  const onButtonClickSignup = () => {
    if (user) {
      window.alert('You are logged in');
    } else {
      navigate('/register');
    }
  };

  return (
    <div className="mainContainer">
      <div className={'buttonContainer'}>
        <Button
          className={'landingButton'}
          onClick={onButtonClickLogin}
          variant={user ? 'danger' : 'primary'} // Change variant based on user state
        >
          {user ? 'Log out' : 'Log in'}
        </Button>
        {user && <div>Your email address is {user.email}</div>}
      </div>

      <div className={'buttonContainer'}>
        <Button className={'landingButton'} onClick={onButtonClickSignup} variant="success">
          Sign up
        </Button>
      </div>
    </div>
  );
};

export default Landing;
