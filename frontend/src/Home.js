import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from './api.js';
import { BrowserRouter, Link } from 'react-router-dom';


function Home() {

	return (
      <div className="App">
        <header className="App-header">
          <h1>Welcome to My App</h1>
          <nav>
            <Link to={`/allchar`}>All Characters</Link>
          </nav>
        </header>
      </div>
  );
}

export default Home;
