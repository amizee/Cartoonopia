import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Import CSS file

const Register = () => {
  // initial state
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [register, setRegister] = useState(false);

  const navigate = useNavigate();

  const onButtonClickLogin = () => {
    navigate('/');
  };

  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();

    if (password !== confirmPassword) {
      window.alert("Password and confirm password do not match");
      return;
    }

    // set configurations
    const config = {
      method: "post",
      url: "http://127.0.0.1:5000/signup",
      data: {
        "firstname": firstname,
        "lastname": lastname,
        "email": email,
        "password": password
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
    <div className="register-container">
      <h2 className="text-center">Signup to create an account</h2>

      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group className="form-group">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </Form.Group>

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

        <Form.Group className="form-group">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </Form.Group>

        <Button type="submit" className="btn-register">Register</Button>
      </Form>

      {/* Display success message */}
      {register && (
        <p className="text-success text-center">You Are Registered Successfully</p>
      )}

      <div className="text-center">
        <span>Already have an account? </span>
        <Button variant="link" onClick={onButtonClickLogin}>Login</Button>
      </div>
    </div>
  );
}

export default Register;
