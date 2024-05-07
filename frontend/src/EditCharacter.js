import React, { useEffect, useState } from 'react';
import api from './api.js';
import { BrowserRouter, Link, useParams, useNavigate } from 'react-router-dom';

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

    useEffect(() => {
        async function fetchCharacter() {
            try {
                const response = await api.get(`/allchar/${id}`);
                console.log(response);
                setCharacter(response.data);
                // Initialize formData state with character data
                setFormData({
                    name: response.data.name,
                    subtitle: response.data.subtitle,
                    description: response.data.description,
                    strength: response.data.strength,
                    speed: response.data.speed,
                    skill: response.data.skill,
                    fear_factor: response.data.fear_factor,
                    power: response.data.power,
                    intelligence: response.data.intelligence,
                    wealth: response.data.wealth,
                    image_url: response.data.image_url
                });
            } catch (error) {
                console.error('Error fetching character details:', error);
            }
        }

        fetchCharacter();
    }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        //const response = await api.post(`/allchar/${id}`, formData);
        console.log('Character updated');
        navigate(`/allchar/${id}`);
    } catch (error) {
        console.error('Error updating character:', error);
    }
  };

  return (
    <div>
      <h1>Edit Character</h1>
      <form onSubmit={handleSubmit}>
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
    </div>
  );
}

export default EditCharacter;