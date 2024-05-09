import React, { useEffect, useState } from 'react';
import api from './api.js';
import { useParams, useNavigate } from 'react-router-dom';

import './static/css/App.css';
import './static/css/EditCharacter.css';
import NavBar from './NavBar.js';

function EditCharacter({ onSubmit }) {
    const navigate   = useNavigate();
    const [character, setCharacter] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        subtitle: '',
        description: '',
        strength: '',
        speed: '',
        skill: '',
        fear_factor: '',
        power: '',
        intelligence: '',
        wealth: '',
        image_url: ''
    });
    const { id } = useParams();
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState(false);

    useEffect(() => {
        async function fetchCharacter() {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const response = await api.get(`/allchar/${id}`, { headers: {"Authorization" : `Bearer ${user.token}`} });
                console.log(response);
                setCharacter(response.data.character);
                // Initialize formData state with character data
                setFormData({
                    name: response.data.character.name,
                    subtitle: response.data.character.subtitle,
                    description: response.data.character.description,
                    strength: response.data.character.strength,
                    speed: response.data.character.speed,
                    skill: response.data.character.skill,
                    fear_factor: response.data.character.fear_factor,
                    power: response.data.character.power,
                    intelligence: response.data.character.intelligence,
                    wealth: response.data.character.wealth,
                    image_url: response.data.character.image_url
                });
            } catch (error) {
                console.error('Error fetching character details:', error);
            }
        }

        fetchCharacter();
    }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === 'speed' || 
    name === 'skill' || name === 'fear_factor' || 
    name === 'power' || name === 'intelligence' || 
    name === 'wealth' || name === 'strength' 
    ? parseFloat(value) : value;
    setFormData({
      ...formData,
      [name]: parsedValue
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        /* Check which fields are changed */
        const changedData = {};
        for (const key in formData) {
          if (formData[key] !== character[key]) {
            changedData[key] = formData[key];
          }
        }

        if (Object.keys(changedData).length === 0) {
          console.log("no changes were made");
          setShowPopup(true);
        } else {
          console.log("formdata: ", formData);
          console.log("changed data: ", changedData);

          changedData["user_email"] = user.email;
          changedData["id"] = character["id"];
          const response = await api.post(`/allchar/${id}/edit`, { data: changedData }, { headers: {"Authorization" : `Bearer ${user.token}`} });
          if (response.status === 201) {
            console.log('Contribution for this character already exists');
            setPopupMessage(true);
          } else {
            console.log('Character edited: ', response);
            navigate(`/allchar/${id}`);
          }
        }
    } catch (error) {
        console.error('Error updating character:', error);
    }
  };

  return (
    <div>
      <NavBar/>
      <body>
        <div class="background-image-blur-whitewash"></div>
      </body>
      <h1 class="heading">Edit Character</h1>
      <div class="container">
        <form onSubmit={handleSubmit} class="edit-form">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} /><br />
          
          <label>Subtitle:</label>
          <input type="text" name="subtitle" value={formData.subtitle} onChange={handleChange} /><br />
          
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange}></textarea><br />
          
          <label>Strength:</label>
          <input type="number" name="strength" value={formData.strength} onChange={handleChange} /><br />
          
          <label>Speed:</label>
          <input type="number" name="speed" value={formData.speed} onChange={handleChange} /><br />
          
          <label>Skill:</label>
          <input type="number" name="skill" value={formData.skill} onChange={handleChange} /><br />
          
          <label>Fear Factor:</label>
          <input type="number" name="fear_factor" value={formData.fear_factor} onChange={handleChange} /><br />
          
          <label>Power:</label>
          <input type="number" name="power" value={formData.power} onChange={handleChange} /><br />
          
          <label>Intelligence:</label>
          <input type="number" name="intelligence" value={formData.intelligence} onChange={handleChange} /><br />
          
          <label>Wealth:</label>
          <input type="number" name="wealth" value={formData.wealth} onChange={handleChange} /><br />
          
          <label>Image Url:</label>
          <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} /><br />

          <button type="submit" onSubmit={handleSubmit}>Submit</button>
        </form>
        {showPopup && (
          <div className="popup">
              <p>No changes were made.</p>
              <button onClick={() => setShowPopup(false)} className="popup-button">OK</button>
          </div>
        )}
        {popupMessage && (
          <div className="popup">
              <p>Character already has an active contribution</p>
              <button onClick={() => setPopupMessage(false)} className="popup-button">OK</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditCharacter;