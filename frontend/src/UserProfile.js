import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from './api.js';
import {BrowserRouter, Link, useNavigate, useParams} from 'react-router-dom';
import { Card, Button, Container, Row, Col, ListGroup} from "react-bootstrap";
import { Favourites } from './Home';

import './static/css/App.css';
// import './static/css/User.css';

function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <div className="top-bar">
          <h1 className="logo-title">Cartoonopia!</h1><button className="nav-button" onClick={() => navigate('/home')}>Go Home</button>
          <button className="nav-button" onClick={() => navigate('/home')}>User Profile</button>
          <button className="nav-button" onClick={() => navigate('/home')}>All Users</button>
          <button className="nav-button" onClick={() => navigate('/allchar')}>All Characters</button></div>
      </header>
      <body className="body-class">
      <div className="background-image-blur-whitewash"></div>
      <Favourites userId={id} />
      </body>
    </div>
  );
}

export default UserProfile;