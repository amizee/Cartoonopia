import React, { useEffect, useState } from 'react';
import api from './api.js';
import { Link, useNavigate } from 'react-router-dom';

import './static/css/App.css';


function History() {
    const navigate = useNavigate();

  useEffect(() => {
    async function fetchCharacters() {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await api.get('/history', { headers: {"Authorization" : `Bearer ${user.token}`} });
        console.log(response);
      } catch (error) {
        console.log("Error fetching history: ", error);
      }
    }

    fetchCharacters();
  }, []);

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
          <h1 class="all-characters-header">Character Change History</h1>
        </header>
      </div>
  );
}

export default History;
