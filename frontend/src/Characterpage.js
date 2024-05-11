import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from './api.js';
import { BrowserRouter, Link, useParams, useNavigate } from 'react-router-dom';
import {IconContext} from "react-icons";
import {IoIosHeartEmpty} from "react-icons/io";


import './static/css/App.css';
import './static/css/CharacterPage.css';
import NavBar from './NavBar.js';


function HeartIcon({ character }) {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    async function checkIsFavourited() {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
          method: "get",
          url: "http://127.0.0.1:5000/favourites",
          headers: {"Authorization" : `Bearer ${user.token}`},
          params: {
            "id": user.id
          },
        };
        const response = await axios(config);

        // If favourited, set heart to red
        console.log("check favourites", response.data);
        Object.keys(response.data).map((key)  =>{
          if (key === character.id) {
            setIsFavorited(true);
          }
        })
      } catch (error) {
        console.error('Error fetching favourites: ', error);
      }
    }

    checkIsFavourited();
  }, []);

  const style = {
    color: isFavorited ? 'red' : 'black',
  };

  async function handleFavourite() {
    setIsFavorited(!isFavorited);
    if (!isFavorited) { // favourited a character so add it
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
          method: "post",
          url: `http://127.0.0.1:5000/favourites`,
          headers: {"Authorization" : `Bearer ${user.token}`},
          data: {
            character: character.id,
            id: user.id
          }
        };
        const response = await axios(config);
        console.log("added character to favourites", response.data);
      } catch (error) {
        console.error('Error adding character:', error);
      }
    } else { // unfavourited a character so delete it
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
          method: "delete",
          url: `http://127.0.0.1:5000/favourites/`,
          headers: {"Authorization" : `Bearer ${user.token}`},
          data: {
            character: character.id,
            id: user.id
          }
        };
        const response = await axios(config);
        console.log("deletion response ", response.data);
      } catch (error) {
        console.error('Error deleting character: ', error);
      }
    }
  }

  return (
    <button className="fav-button" style={style} onClick={handleFavourite}>
      <IconContext.Provider value={{ size: '50px' }}>
        <div>
          <IoIosHeartEmpty />
        </div>
      </IconContext.Provider>
    </button>
  );
}

function Characterpage() {
	const [character, setCharacters] = useState(null);
  const [addedBy, setAddedBy] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    async function fetchCharacter() {
      try {
        const response = await api.get(`/allchar/${id}`, { headers: {"Authorization" : `Bearer ${user.token}`} });
        setCharacters(response.data.character);
        setAddedBy(response.data.created_by);
      } catch (error) {
        console.error('Error fetching character details:', error);
      }
    }

    fetchCharacter();
  }, [id]);


  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();

    // set configurations
    const config = {
      method: "post",
      url: "http://127.0.0.1:5000/allchar/:id/delete",
      headers: {"Authorization" : `Bearer ${user.token}`},
      data: {
        "data": {
          "id" : id
        }
      }
    };

    axios(config)
      .then((r) => {
        if (r.data.success === false) {
          window.alert("Error: " + r.data.message);
        } else {
          navigate("/allchar/");
        }
      })
      .catch((error) => {
        error = new Error();
      });
  };

	return (
        <div>
        <NavBar/>
        <h1 class="heading">Character Details</h1>
        {character ? (
          <div class="container">
            <img src={character.image_url} class="char-image"></img>
            <div id="icon-container">
              <h2 className="char-name">{character.name}</h2>
              <HeartIcon character={character}/>
            </div>
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

            {user.isAdmin ? (
                <div><button className="edit-link" onClick={(e) => handleSubmit(e)}>Delete</button></div>
            ) : (
              <div></div>
            )}

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
