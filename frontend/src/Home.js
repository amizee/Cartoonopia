import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from './api.js';
import { BrowserRouter, Link, useNavigate } from 'react-router-dom';
import { Card, Button, Container, Row, Col, ListGroup} from "react-bootstrap";

import './static/css/App.css';
import './static/css/Home.css';

function Favourites({ userId }) {
  const navigate = useNavigate();
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    async function fetchFavourites() {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
          method: "get",
          url: "http://127.0.0.1:5000/favourites",
          headers: {"Authorization" : `Bearer ${user.token}`},
          params: {
            "id": userId
          },
        };
        const response = await axios(config);
        setFavourites(response.data);
      } catch (error) {
        console.error('Error fetching favourites: ', error);
      }
    }

    fetchFavourites();
  }, []);

  return (
    <div id="fav-container">
      <h2>Favourites</h2>
      <Row>
        {Object.keys(favourites).map((key, index) => (
          <Col key={favourites[key][0]._id} xs={6} md={3}>
            <Card className="fav-card">
              <Card.Img className="fav-img" variant="top" src={require(`./static/${favourites[key][0].image_url}`)} alt={key}/>
              <Card.Body>
                <Card.Title>{key}</Card.Title>
                <Button variant="dark" onClick={() => navigate(`/allchar/${key.replace(/ /g,'')}`)}>Learn more</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

function SearchBar({searchInput, onInputChange}) {
  const [users, setUsers] = useState([]);
  async function getUsers(e) {
    e.preventDefault();
    if (searchInput === "") {
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const config = {
        method: "get",
        url: "http://127.0.0.1:5000/users",
        headers: {"Authorization" : `Bearer ${user.token}`},
        params: {
          "input": searchInput
        },
      };
      const response   = await axios(config);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users: ', error);
    }
  }

  return (
    <div id="search">
      <h2>Profiles</h2>
      <form id="search-form" onSubmit={getUsers}>
        <input className="search-input" type="text" value={searchInput} placeholder="Search users"
          onChange={(e) => onInputChange(e.target.value)}
        />
        <Button className="search-form" variant="dark" type="submit">Search</Button>
      </form>
      <ListGroup>
        {users.map(user => (
          <ListGroup.Item key={user._id} id="search-results">
            <Link id="user-link" to={`/users/${user._id}`}>{user.firstname + " " + user.lastname}</Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

function Home() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');

  return (
    <div className="App">
      <header className="App-header">
        <div className="top-bar">
          <h1 className="logo-title">Cartoonopia!</h1><button className="nav-button" onClick={() => navigate('/home')}>Go Home</button>
          <button className="nav-button" onClick={() => navigate('/home')}>User Profile</button>
          <button className="nav-button" onClick={() => navigate('/home')}>All Users</button>
          <button className="nav-button" onClick={() => navigate('/allchar')}>All Characters</button></div>
      </header>
      <body className="body-class">
      <div className="background-image-blur-whitewash"></div>
      <Favourites userId={JSON.parse(localStorage.getItem('user')).id}/>
      <SearchBar searchInput={searchInput} onInputChange={setSearchInput}/>
      </body>
    </div>
  );
}

export default Home;
export {Favourites};