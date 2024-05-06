import React, { useEffect, useState } from 'react';
import api from './api.js';
import { Link } from 'react-router-dom';

import './static/css/App.css';


function Allcharacters() {
	const [characters, setCharacters] = useState([]);

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
          <h1>Welcome to My App</h1>
          <nav>
            <Link to={'/newchar'}>Add new character</Link>
            <ul>
              {characters.map(character => (
                <li key={character._id}>
                  <Link to={`/allchar/${character.id}`}>{character.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>
        <body>
          <div class="background-image-blur-whitewash"></div>
        </body>
      </div>
  );
}

export default Allcharacters;
