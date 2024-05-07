import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from './api.js';
import { BrowserRouter, Link, useNavigate } from 'react-router-dom';

import './static/css/App.css';


function Home() {
  const navigate = useNavigate();

	return (
      <div className="App">
        <header className="App-header">
        <div className="top-bar">
          <h1 className="logo-title">Cartoonopia!</h1>
          <button className="nav-button" onClick={() => navigate('/home')}>Go Home</button>
          <button className="nav-button" onClick={() => navigate('/home')}>User Profile</button>
          <button className="nav-button" onClick={() => navigate('/home')}>All Users</button>
          <button className="nav-button" onClick={() => navigate('/allchar')}>All Characters</button>
        </div>
          <h1>Welcome to My App</h1>
          <nav>
            <Link to={`/contributions`}>Contributions</Link>
          </nav>
        </header>
        <body>
          <div class="background-image-blur-whitewash"></div>
        </body>
      </div>
  );
}

export default Home;
