import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from './api.js';
import { BrowserRouter, Link, useParams } from 'react-router-dom';

function Characterpage() {
	const [character, setCharacters] = useState(null);
    const { id } = useParams();

  useEffect(() => {
    async function fetchCharacter() {
      try {
        const response = await api.get(`/allchar/${id}`);
        console.log(response);
        setCharacters(response.data);
      } catch (error) {
        console.error('Error fetching character details:', error);
      }
    }

    fetchCharacter();
  }, [id]);

	return (
        <div>
        <h1>Character Details</h1>
        {character ? (
          <div>
            <h2>{character.name}</h2>

            <p>Subtitle: {character.subtitle}</p>
            <p>Description: {character.description}</p>
            <div id="stats">
                <p>Strength: {character.strength}</p>
                <p>Speed: {character.speed}</p>
                <p>Skill: {character.skill}</p>
                <p>Fear Factor: {character.fear_factor}</p>
                <p>Power: {character.power}</p>
                <p>Intelligence: {character.intelligence}</p>
                <p>Wealth: {character.wealth}</p>
            </div>
            <Link to={`/allchar/${id}/edit`}>edit details</Link>
          </div>
        ) : (
          <p>Loading character details...</p>
        )}
      </div>
  );
}

export default Characterpage;
