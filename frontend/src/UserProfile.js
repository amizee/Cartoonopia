import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {BrowserRouter, Link, useNavigate, useParams} from 'react-router-dom';
import { Favourites, Contributions } from './Home';

import './static/css/App.css';

function UserProfile(props) {
  const { name } = useParams();
  const navigate = useNavigate();
  const { isProfile } = props;
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUserId() {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
          method: "get",
          url: "http://127.0.0.1:5000/user",
          headers: {"Authorization": `Bearer ${user.token}`},
          params: {
            "name": name
          },
        };
        const response = await axios(config);
        setId(response.data.userId._id);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users: ', error);
      }
    }

    getUserId();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="top-bar">
          <h1 className="logo-title">Cartoonopia!</h1><button className="nav-button" onClick={() => navigate('/home')}>Home</button>
          <button className="nav-button" onClick={() => navigate('/home')}>Users</button>
          <button className="nav-button" onClick={() => navigate('/allchar')}>Characters</button></div>
      </header>
      <body className="body-class">
      <div className="background-image-blur-whitewash"></div>
      <Favourites userId={id} />
      <Contributions userId={id} isProfile={isProfile} />
      </body>
    </div>
  );
}

export default UserProfile;