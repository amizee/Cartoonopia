import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from './api.js';

function App() {
	const [characters, setCharacters] = useState([]);

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
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My App</h1>
        <nav>
          <ul>
            {characters.map(character => (
              <li key={character._id}>{character.name}</li>
            ))}
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default App;
