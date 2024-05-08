import React, { useEffect, useState } from 'react';
import api from './api.js';
import { Link, useNavigate } from 'react-router-dom';

import './static/css/App.css';
import './static/css/Allcharacters.css';


function Allcharacters() {
	const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCharacters() {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await api.get('/allchar', { headers: {"Authorization" : `Bearer ${user.token}`} });
        console.log(response);
        setCharacters(response.data);
      } catch (error) {
        console.error('Error fetching characters:', error);
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

          <h1 class="all-characters-header">All Characters</h1>
          <nav>
            <button className="add-new-character-button" onClick={() => navigate('/newchar')}>Add new character</button>
          </nav>
        </header>
        <body class="body-class">
          <div class="background-image-blur-whitewash"></div>
              {characters.map(character => (
                character.active && (
                <div className="char-entry" key={character.id}>
                <div className="char-box">
                  <p class="char-name-small">{character.name}</p>
                  <p className="char-subtitle-small">{character.subtitle}</p>
                  <div className="char-stats">
                    <p>Strength: {character.strength}</p>
                    <p>Speed: {character.speed}</p>
                    <p>Skill: {character.skill}</p>
                    <p>Fear Factor: {character.fear_factor}</p>
                    <p>Power: {character.power}</p>
                    <p>Intelligence: {character.intelligence}</p>
                    <p>Wealth: {character.wealth}</p>
                  </div>
                </div>
                <button className="view-details" onClick={() => navigate(`/allchar/${character.id}`)}>View Details</button>
              </div>
              )
              ))}
        </body>
      </div>
  );
}

export default Allcharacters;
