import React, { useState } from 'react';
import api from './api.js';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar.js';
import './static/css/App.css';
import './static/css/EditCharacter.css';

function Addcharacter({ onSubmit }) {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [showPopupExisting, setShowPopupExisting] = useState(false);

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
    if (!isFormValid()) {
      setShowPopup(true);
    } else {
      try {

          
          const user = JSON.parse(localStorage.getItem('user'));

          const existingChar = await api.get(`/allchar/${formData.id}`, { headers: {"Authorization" : `Bearer ${user.token}`} });
          console.log("existing char?: ", existingChar);
          if (existingChar !== null) {
            
            setShowPopupExisting(true);
            return;
          }

          /* formData["user_email"] = user.email;
          console.log(user);
          console.log("formdata: ", formData);
          const response = await api.post(`/newchar`, { data: formData }, { headers: {"Authorization" : `Bearer ${user.token}`} });
          console.log('Character added: ', response);
          navigate(`/allchar`); */
      } catch (error) {
          if (error.response && error.response.status === 404) {
            // Proceed if existingChar doesn't exist (404 error)
            const user = JSON.parse(localStorage.getItem('user'));
            formData["user_email"] = user.email;
            console.log(user);
            console.log("formdata: ", formData);
            const response = await api.post(`/newchar`, { data: formData }, { headers: {"Authorization" : `Bearer ${user.token}`} });
            console.log('Character added: ', response);
            navigate(`/allchar`);
        } else {
            console.error('Error adding character:', error);
        }
      }
    }
    
  };

  const isFormValid = () => {
    return Object.values(formData).every(value => value !== '');
  };

  return (
    <div>
      <NavBar/>
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

          {showPopup && (
            <div className="popup">
                <p>Please fill out all fields.</p>
                <button onClick={() => setShowPopup(false)} className="popup-button">OK</button>
            </div>
          )}
          {showPopupExisting && (
            <div className="popup">
                <p>Character with same ID already exists.</p>
                <button onClick={() => setShowPopupExisting(false)} className="popup-button">OK</button>
            </div>
          )}

        </form>
      </div>
    </div>
  );
}

export default Addcharacter;