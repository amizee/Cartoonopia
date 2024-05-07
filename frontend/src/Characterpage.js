import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from './api.js';
import { BrowserRouter, Link, useParams, useNavigate } from 'react-router-dom';

import './static/css/App.css';
import './static/css/CharacterPage.css';

function Characterpage() {
	const [character, setCharacters] = useState(null);
  const [addedBy, setAddedBy] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCharacter() {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await api.get(`/allchar/${id}`, { headers: {"Authorization" : `Bearer ${user.token}`} });
        console.log(response);
        setCharacters(response.data.character);
        setAddedBy(response.data.created_by);
      } catch (error) {
        console.error('Error fetching character details:', error);
      }
    }

    fetchCharacter();
  }, [id]);

	return (
        <div>
        <h1 class="heading">Character Details</h1>
        {character ? (
          <div class="container">
            <img src={character.image_url} class="char-image"></img>
            <h2 class="char-name">{character.name}</h2>
            <p class="char-subtitle">{character.subtitle}</p>
            <p class="char-description">{character.description}</p>
            <div class="stats" id="stats">
                <p>Strength: {character.strength}</p>
                <p>Speed: {character.speed}</p>
                <p>Skill: {character.skill}</p>
                <p>Fear Factor: {character.fear_factor}</p>
                <p>Power: {character.power}</p>
                <p>Intelligence: {character.intelligence}</p>
                <p>Wealth: {character.wealth}</p>
            </div>
            <p class="added-by">Character submitted by: {addedBy}</p>
            <button className="edit-link" onClick={() => navigate(`/allchar/${id}/edit`)}>Edit Details</button>
          </div>
        ) : (
          <p>Loading character details...</p>
        )}

        <body>
          <div class="background-image-blur-whitewash"></div>
        </body>
        </div>
  );
}

export default Characterpage;
