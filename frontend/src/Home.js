import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from './api.js';
import { BrowserRouter, Link, useNavigate } from 'react-router-dom';
import { Card, Button, Container, Row, Col} from "react-bootstrap";

import './static/css/App.css';
import './static/css/Home.css';
import NavBar from './NavBar.js';

function Favourites({ favourites }) {
  const navigate = useNavigate();

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

function MyComponent() {
  return (
    <div>
      <img src="static/images/batman.jpg" alt="Batman" />
    </div>
  );
}

function Home() {
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
            "id": user.id
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
    <div className="App">
      <header className="App-header">
        <NavBar/>
      </header>
      <body className="body-class">
      <div className="background-image-blur-whitewash"></div>
      <Favourites favourites={favourites}/>
      </body>
    </div>
  );
}

export default Home;
