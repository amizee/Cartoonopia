import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Allcharacters from './Allcharacters';
import Characterpage from './Characterpage';
import Home from './Home';
import EditCharacter from './EditCharacter';

function App() {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={ <Home/> } />
          <Route exact path="/allchar" element={ <Allcharacters/> } />
          <Route path="/allchar/:id" element={ <Characterpage/> } />
          <Route path="/allchar/:id/edit" element={ <EditCharacter/> } />
        </Routes>
      </Router>
  );
}

export default App;