import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from './api.js';
import { BrowserRouter, Link } from 'react-router-dom';


function Allcharacters() {
	const [characters, setCharacters] = useState([]);

  useEffect(() => {
    async function fetchCharacters() {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log(user);
        const response = await api.get('/allchar', { headers: {"Authorization" : `Bearer ${user.token}`} });
        //const response = await api.get('/allchar');
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
            <ul>
              {characters.map(character => (
                <li key={character._id}>
                  <Link to={`/allchar/${character.id}`}>{character.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>
      </div>
  );
}

export default Allcharacters;
