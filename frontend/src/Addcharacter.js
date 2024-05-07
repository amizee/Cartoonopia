import React, { useState } from 'react';
import api from './api.js';
import { useNavigate } from 'react-router-dom';

import './static/css/App.css';
import './static/css/EditCharacter.css';

function Addcharacter({ onSubmit }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        id: '',
        subtitle: '',
        description: '',
        strength: '',
        speed: 0,
        skill: 0,
        fear_factor: 0,
        power: 0,
        intelligence: 0,
        wealth: 0,
        image_url: ''
    });

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
        formData["user_email"] = user.email;
        console.log(user);
        console.log("formdata: ", formData);
        const response = await api.post(`/newchar`, { data: formData }, { headers: {"Authorization" : `Bearer ${user.token}`} });
        console.log('Character added: ', response);
        navigate(`/allchar`);
    } catch (error) {
        console.error('Error adding character:', error);
    }
  };

  return (
    <div>
      <body>
        <div class="background-image-blur-whitewash"></div>
      </body>
      <h1 class="heading">Add new Character</h1>
      <div class="container">
        <form onSubmit={handleSubmit} class="edit-form">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} /><br />
          
          <label>ID:</label>
          <input type="text" name="id" value={formData.id} onChange={handleChange} /><br />

          <label>Subtitle:</label>
          <input type="text" name="subtitle" value={formData.subtitle} onChange={handleChange} /><br />
          
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange}></textarea><br />
          
          <label>Strength:</label>
          <input type="number" name="strength" onChange={handleChange} /><br />
          
          <label>Speed:</label>
          <input type="number" name="speed" onChange={handleChange} /><br />
          
          <label>Skill:</label>
          <input type="number" name="skill" onChange={handleChange} /><br />
          
          <label>Fear Factor:</label>
          <input type="number" name="fear_factor" onChange={handleChange} /><br />
          
          <label>Power:</label>
          <input type="number" name="power" onChange={handleChange} /><br />
          
          <label>Intelligence:</label>
          <input type="number" name="intelligence" onChange={handleChange} /><br />
          
          <label>Wealth:</label>
          <input type="number" name="wealth" onChange={handleChange} /><br />
          
          <label>Image Url:</label>
          <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} /><br />

          <button type="submit" onSubmit={handleSubmit}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Addcharacter;