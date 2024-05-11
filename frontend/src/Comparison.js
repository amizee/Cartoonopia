import React, { useEffect, useState } from 'react';
import api from './api.js';
import axios from 'axios';
import { BrowserRouter, Link, useNavigate } from 'react-router-dom';
import { Card, Button, Table, Row, Col, ListGroup} from "react-bootstrap";
import "./static/css/Comparison.css";
import NavBar from "./NavBar.js";

function Comparison() {

    const [characters, setCharacters] = useState([]);
    const [selectedCharacters, setSelectedCharacters] = useState([]);
    const [previousComparisons, setPreviousComparisons] = useState([]);
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [filterValues, setFilterValues] = useState({
        strMin: 0,
        strMax: 100,
        spdMin: 0,
        spdMax: 100,
        sklMin: 0,
        sklMax: 100,
        fearMin: 0,
        fearMax: 100,
        powMin: 0,
        powMax: 100,
        intMin: 0,
        intMax: 100,
        wltMin: 0,
        wltMax: 100
    });

    useEffect(() => {
        // Save previous comparisons to localStorage when updated
        localStorage.setItem('previousComparisons', JSON.stringify(previousComparisons));
    }, [previousComparisons]);
    

    useEffect(() => {
        // Load previous comparisons from localStorage
        const storedComparisons = JSON.parse(localStorage.getItem('previousComparisons'));
        if (storedComparisons) {
            setPreviousComparisons(storedComparisons);
        }
    }, []);

    const loadComparison = (comparison) => {
        // Set selected characters to the characters in the comparison
        setSelectedCharacters(comparison);
    };

    useEffect(() => {
        async function fetchCharacters() {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const response = await api.get('/allchar', { headers: { "Authorization": `Bearer ${user.token}` } });
            console.log(response);
            setCharacters(response.data);
        } catch (error) {
            console.error('Error fetching characters:', error);
        }
        }

        fetchCharacters();
    }, []);

    const handleSearchInputChange = (e) => {
        setSearchTerm(e.target.value.trim().toLowerCase());
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilterValues({
        ...filterValues,
        [name]: parseInt(value)
        });
    };

    const filterCharacters = (character) => {
        const { name, strength, speed, skill, fear_factor, power, intelligence, wealth } = character;
        const { strMin, strMax, spdMin, spdMax, sklMin, sklMax, fearMin, fearMax, powMin, powMax, intMin, intMax, wltMin, wltMax } = filterValues;

        const matchesSearch = name.toLowerCase().includes(searchTerm);
        const withinRange = strength >= strMin && strength <= strMax &&
        speed >= spdMin && speed <= spdMax &&
        skill >= sklMin && skill <= sklMax &&
        fear_factor >= fearMin && fear_factor <= fearMax &&
        power >= powMin && power <= powMax &&
        intelligence >= intMin && intelligence <= intMax &&
        wealth >= wltMin && wealth <= wltMax;

        return matchesSearch && withinRange;
    };

    const filteredCharacters = characters.filter(filterCharacters);

    const handleCharacterSelect = (characterId) => {
        const selectedCharacter = characters.find(character => character.id === characterId);
        
        if (selectedCharacter) {
            // Check if the selected character is already in selectedCharacters
            if (selectedCharacters.some(char => char.id === characterId)) {
                // If it is, remove it
                setSelectedCharacters(prevState => prevState.filter(char => char.id !== characterId));
            } else {
                // If it's not, add it
                setSelectedCharacters(prevState => [...prevState, selectedCharacter]);
            }
    
            // Update previous comparisons
            if (selectedCharacters.length === 2) {   
                setPreviousComparisons(prevComparisons => [...prevComparisons, selectedCharacters]);
            }
    
            /* Generate comparison table (ticks and stuff) */
            console.log("generate triggered!");
            console.log("char1: ", selectedCharacters[0]);
            console.log("char2: ", selectedCharacters[1]);
            var comparisonDiv = document.getElementById('comparison');
            comparisonDiv.innerHTML = '';
        }
    };

    return (
        
        <div>
            <NavBar/>
          <div className="background-image-blur-whitewash"></div>
    
          <div className="title">
            <h1>Cartoonopia</h1>
            <h4>The home of characters and cartoons!</h4>
          </div>
    
          <div className="comp-container">
            {<div className="slider-section" id="slider-section">
            </div>}
    
            <div className="search-table">
              <form id="search-form">
                <input id="search-input" type="text" placeholder="Search Characters" onChange={handleSearchInputChange}/>
              </form>
              <table className="character-table" id="character-table">
                <thead>
                  <tr className="header">
                    <th>Name</th>
                    <th>Strength</th>
                    <th>Speed</th>
                    <th>Skill</th>
                    <th>Fear Factor</th>
                    <th>Power</th>
                    <th>Intelligence</th>
                    <th>Wealth</th>
                    <th>Selected</th>
                  </tr>
                </thead>
                <tbody>
                {filteredCharacters.map(character => (
                    <tr key={character.id}>
                    <td>{character.name}</td>
                    <td>{character.strength}</td>
                    <td>{character.speed}</td>
                    <td>{character.skill}</td>
                    <td>{character.fear_factor}</td>
                    <td>{character.power}</td>
                    <td>{character.intelligence}</td>
                    <td>{character.wealth}</td>
                    <td><input 
                        type="checkbox"
                        onChange={() => handleCharacterSelect(character.id)}
                        checked={selectedCharacters.some(char => char.id === character.id)}
                    /></td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
    
            <div className="prev-comparisons" id="prev-comparisons">
                <h2>Previous Comparisons</h2>
                <table id="prev-comparisons-table" className="prev-comparisons-table">
                    <tbody>
                        {previousComparisons.map((comparison, index) => (
                            <tr key={index}>
                                <td>
                                    <Button onClick={() => loadComparison(comparison)}>Comparison {index + 1}</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </div>
    
          <div className="character-display-container">
                <div className="selected-1">
                    {selectedCharacters.length > 0 ? (
                        <img src={`images/${selectedCharacters[0].image}`} alt={selectedCharacters[0].name} />
                    ) : (
                        <img src="./static/images/qmark.jpg" alt="placeholder" id="placeholder" />
                    )}
                </div>

                <div className="vs"></div>

                <div className="selected-2">
                    {selectedCharacters.length > 1 ? (
                        <img src={`images/${selectedCharacters[1].image}`} alt={selectedCharacters[1].name} />
                    ) : (
                        <img src="./static/images/qmark.jpg" alt="placeholder" id="placeholder" />
                    )}
                </div>
            </div>
    
          <div className="comparison" id="comparison">
            <table className="comparison-table">
                <tr>
                    <td className="chars-cell">
                        
                    </td>
                    <td className="stats-cell">
                        Strength
                    </td>
                    <td className="chars-cell">

                    </td>
                </tr>
                <tr>
                    <td className="chars-cell">
                        
                    </td>
                    <td className="stats-cell">
                        Speed
                    </td>
                    <td className="chars-cell">

                    </td>
                </tr>
                <tr>
                    <td className="chars-cell">
                        
                    </td>
                    <td className="stats-cell">
                        Skill
                    </td>
                    <td className="chars-cell">

                    </td>
                </tr>
                <tr>
                    <td className="chars-cell">
                        
                    </td>
                    <td className="stats-cell">
                        Fear
                    </td>
                    <td className="chars-cell">

                    </td>
                </tr>
                <tr>
                    <td className="chars-cell">
                        
                    </td>
                    <td className="stats-cell">
                        Power
                    </td>
                    <td className="chars-cell">

                    </td>
                </tr>
                <tr>
                    <td className="chars-cell">
                        
                    </td>
                    <td className="stats-cell">
                        Intelligence
                    </td>
                    <td className="chars-cell">

                    </td>
                </tr>
                <tr>
                    <td className="chars-cell">
                        
                    </td>
                    <td className="stats-cell">
                        Wealth
                    </td>
                    <td className="chars-cell">

                    </td>
                </tr>
            </table>
          </div>
        </div>
    );
};

export default Comparison;