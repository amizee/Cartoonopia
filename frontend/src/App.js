import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Container, Row } from "react-bootstrap";
import Landing from './Landing'
import Login from './Login'
import Register from './Register'
import Allcharacters from './Allcharacters';
import Characterpage from './Characterpage';
import Home from './Home';
import EditCharacter from './EditCharacter';
import Addcharacter from './Addcharacter.js';

function App() {
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


	return (
    <Container>
      <Row>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
            <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
            <Route path="/register" element={<Register />} />
            <Route exact path="/home" element={ <Home/> } />
            <Route exact path="/allchar" element={ <Allcharacters/> } />
            <Route path="/allchar/:id" element={ <Characterpage/> } />
            <Route path="/allchar/:id/edit" element={ <EditCharacter/> } />
            <Route path="/newchar" element={ <Addcharacter/> } />
          </Routes>
        </BrowserRouter>
      </Row>
    </Container>
    
  );
}

export default App;