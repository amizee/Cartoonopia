import React, { useEffect, useState } from 'react';
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './static/css/Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onButtonClickSignup = () => {
    navigate('/register');
  };
  
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    {user ? (
      navigate('/home')
    ) : (
      navigate('/')
    )}
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const config = {
      method: "post",
      url: "http://127.0.0.1:5000/login",
      data: {
        "email" : email,
        "password" : password,
      },
    };

    axios(config)
      .then((r) => {
        if (r.data.success) {
          localStorage.setItem('user', JSON.stringify({ email, token: r.data.token, id: r.data.id, isAdmin: r.data.admin}))
          
          navigate('/home');
        } else {
          window.alert('Email or password incorrect');
        }
      })
      .catch((error) => {
        error = new Error();
      });
  };

  return (
    <div>
          <div class="background-image-blur-whitewash"></div>
          <div className="login-container">
            <h2 className="text-center">Welcome</h2>
            <Form onSubmit={(e) => handleSubmit(e)}>
              <Form.Group className="form-group">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="form-group">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <button type="submit" block className="btn-login">Login</button>
            </Form>

            <div className="text-center">
              <span>Don't have an account? </span>
              <Button variant="link" onClick={onButtonClickSignup}>Sign up for free</Button>
            </div>

            
          </div>
        
    </div>
   
  );
}

export default Login;
