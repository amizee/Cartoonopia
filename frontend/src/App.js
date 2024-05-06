import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Container, Col, Row } from "react-bootstrap";
import Landing from './Landing'
import Login from './Login'
import Register from './Register'
import Allcharacters from './Allcharacters';
import Characterpage from './Characterpage';
import Home from './Home';
import EditCharacter from './EditCharacter';
import Protected from './Protected';

function App() {
  
	return (
    <BrowserRouter>
      <Routes>

        <Route element = {<Protected/>}>
          <Route path='/home' element={<Home/>}/>
          <Route exact path="/allchar" element={ <Allcharacters/> } />
          <Route path="/allchar/:id" element={ <Characterpage/> } />
          <Route path="/allchar/:id/edit" element={ <EditCharacter/> } />
        </Route>
        <Route path='/' element={<Landing/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;