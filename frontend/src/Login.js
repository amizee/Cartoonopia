import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from 'react-router-dom'

const Login = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()
  
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
          localStorage.setItem('user', JSON.stringify({ email, token: r.token }))
          props.setLoggedIn(true)
          props.setEmail(email)
          //change navigate to character homepage
          navigate('/')
        } else {
          window.alert('Email or password incorrect')
        }
      })
      .catch((error) => {
        error = new Error();
      });
  };

  return (
    <>
      <h2>Login</h2>
      <Form onSubmit={(e) => handleSubmit(e)}>
        
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button type="submit">Login</Button>

        {/* display success message */}
        {props.Login ? (
          <p className="text-success">You Are Logged in Successfully</p>
        ) : (
          <p className="text-danger">You Are Not Logged in</p>
        )}
      </Form>
    </>
  );
}

export default Login;