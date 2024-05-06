import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from 'react-router-dom'

const Register = () => {
  // initial state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const navigate = useNavigate()

  const onButtonClickLogin = () => {
      navigate('/login');
  };

  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();

    // set configurations
    const config = {
      method: "post",
      url: "http://127.0.0.1:5000/signup",
      data: {
        "firstname" : firstname,
        "lastname" : lastname,
        "email" : email,
        "password" : password
      },
    };

    axios(config)
      .then((r) => {

        if (r.data.success === false) {
          window.alert("Error: " + r.data.message);
        } else if (r.status === 200) {
          setRegister(true);
        }
        
      })
      .catch((error) => {
        error = new Error();
      });
  };

  return (
    <>
        <h2>Register</h2>

        <div className={'buttonContainer'}>
          <Button
            className={'landingButton'}
            onClick={onButtonClickLogin}
          >Log in
          </Button>
        </div>

        <Form onSubmit={(e) => handleSubmit(e)}>

        <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control
            type="name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            />
        </Form.Group>

        <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
            type="name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            />
        </Form.Group>
        
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

        <Button type="submit">Register</Button>

        {/* display success message */}
        {register ? (
            <p className="text-success">You Are Registered Successfully</p>
        ) : (
            <></>
        )}
        </Form>
    </>
  );
}

export default Register