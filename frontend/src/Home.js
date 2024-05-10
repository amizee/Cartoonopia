import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from './api.js';
import { BrowserRouter, Link, useNavigate } from 'react-router-dom';
import { Card, Button, Table, Row, Col, ListGroup} from "react-bootstrap";
import {MdDelete} from "react-icons/md";
import { IconContext } from "react-icons";
import { IoIosHeartEmpty } from "react-icons/io";

import './static/css/App.css';
import './static/css/Home.css';
import NavBar from './NavBar.js';

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
    <div id="home-container">
      <h2>Favourites</h2>
      {(JSON.stringify(favourites) !== '{}') ? (
        <Row>
          {Object.keys(favourites).map((key, index) => (
            <Col key={favourites[key][0]._id} xs={6} sm={4} md={3} lg={2}>
              <Card className="fav-card">
                <Card.Img className="fav-img" variant="top" src={require(`./static/${favourites[key][0].image_url}`)} alt={key}/>
                <Card.Body>
                  <Card.Title>{key}</Card.Title>
                  {/*<Button variant="dark" onClick={() => navigate(`/allchar/${key.replace(/ /g,'')}`)}>Learn more</Button>*/}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p>No favourites</p>
      )}
    </div>
  )
}

function Contributions({ userId, isProfile }) {
  const [contributions, setContributions] = useState([]);
  const [deleted, setDeleted] = useState(false); /* if deleted state changes fetchContributions is triggered to update rows */
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchContributions() {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
          method: "get",
          url: `http://127.0.0.1:5000/contributions/${userId}`,
          headers: {"Authorization" : `Bearer ${user.token}`},
        };
        const response = await axios(config);
        setContributions(response.data);
        setDeleted(false);
      } catch (error) {
        console.error('Error fetching contributions: ', error);
      }
    }

    fetchContributions();
  }, [deleted]);


  async function handleDelete(id) {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const config = {
        method: "delete",
        url: `http://127.0.0.1:5000/contributions/${id}`,
        headers: {"Authorization" : `Bearer ${user.token}`},
      };
      const response = await axios(config);
      console.log("deletion response ", response.data);
      setDeleted(true);
    } catch (error) {
      console.error('Error deleting contributions: ', error);
    }
  }

  return (
    <div id="home-container">
      <h2>Contributions</h2>
      {(contributions.length !== 0) ? (
        <table id="contributions-table">
          <thead className="table-header">
          <tr>
            <th>id</th>
            <th>Action</th>
            <th>Status</th>
            <th>Date</th>
            <th>Data</th>
          </tr>
          </thead>
          <tbody>
          {contributions.map(contribution => (
            <tr key={contribution.contribution_id}>
              <td>{contribution.contribution_id}</td>
              <td>{contribution.action}</td>
              <td>{contribution.status}</td>
              <td>{contribution.date}</td>
              <td>
                {Object.keys(contribution.data).map((key, index) => (
                  <p key={index} className="contribution-data">{key}: {contribution.data[key]}</p>
                ))}
              </td>
              {(!isProfile && contribution.status === 'Pending') ? ( /* if this is a user profile ignore the delete button*/
                <td>
                  <button id="delete-button" onClick={() => handleDelete(contribution.contribution_id)}>
                    <MdDelete size={20}/>
                  </button>
                </td>
              ) : (
                <td>
                </td>
              )}
            </tr>
          ))}
          </tbody>
        </table>
        ) : (
        <p>No contributions</p>
      )}
    </div>
  )
    ;
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
        headers: {"Authorization": `Bearer ${user.token}`},
        params: {
          "input": searchInput
        },
      };
      const response = await axios(config);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users: ', error);
    }
  }

  return (
    <div id="home-container">
      <h2>Profiles</h2>
      <form id="search-form" onSubmit={getUsers}>
        <input className="search-input" type="text" value={searchInput} placeholder="Search users"
               onChange={(e) => onInputChange(e.target.value)}
        />
        <Button className="search-form" variant="dark" type="submit">Search</Button>
      </form>
      {(users.length !== 0) ? (
        <ListGroup>
          {users.map(user => (
            <ListGroup.Item key={user._id} id="search-results">
              <Link id="user-link" to={`/users/${user._id}`}>{user.firstname + " " + user.lastname}</Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
        ) : (
          <p>No matching results</p>
        )}
    </div>
  );
}

function Home() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');

  return (
    <div className="App">
      <header className="App-header">
        <NavBar/>
      </header>
      <body className="body-class">
      <div className="background-image-blur-whitewash"></div>
      <Favourites userId={JSON.parse(localStorage.getItem('user')).id}/>
      <Contributions userId={JSON.parse(localStorage.getItem('user')).id} isProfile={false}/>
      <SearchBar searchInput={searchInput} onInputChange={setSearchInput}/>
      </body>
    </div>
  );
}

export default Home;
export {Favourites, Contributions};