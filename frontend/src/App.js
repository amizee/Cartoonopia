import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Allcharacters from './Allcharacters';
import Characterpage from './Characterpage';
import Home from './Home';

function App() {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={ <Home/> } />
          <Route exact path="/allchar" element={ <Allcharacters/> } />
          <Route path="/allchar/:id" element={ <Characterpage/> } />
        </Routes>
      </Router>
  );
}

export default App;