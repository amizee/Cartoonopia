import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import api from './api.js';
import { Container, Col, Row } from "react-bootstrap";
import Home from './Home'
import Login from './Login'
import Register from './Register'

function App() {
	const [characters, setCharacters] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    // Fetch the user email and token from local storage
    const user = JSON.parse(localStorage.getItem('user'))
  
    // If the token/email does not exist, mark the user as logged out
    if (!user || !user.token) {
      setLoggedIn(false)
      return
    }
  }, [])

  useEffect(() => {
    async function fetchCharacters() {
      try {
        const response = await api.get('/allchar');
				console.log(response);
        setCharacters(response.data);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    }

    fetchCharacters();
  }, []);

	return (
    <Container>
      <Row>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
            <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </Row>
    </Container>
  );
}

export default App;
