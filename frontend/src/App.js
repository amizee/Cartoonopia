import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Allcharacters from './Allcharacters';
import Characterpage from './Characterpage';
import Home from './Home';
import EditCharacter from './EditCharacter';
import Addcharacter from './Addcharacter.js';
import Contributions from './Contributions';
import History from './History.js';
import Protected from './Protected';
import UserProfile from "./UserProfile";
import Comparison from "./Comparison";

function App() {
  
	return (
    <BrowserRouter>
      <Routes>
        <Route element = {<Protected/>}>
          <Route path='/home' element={<Comparison/>}/>
          <Route path='/user' element={<Home/>}/>
          <Route exact path="/allchar" element={ <Allcharacters/> } />
          <Route path="/allchar/:id" element={ <Characterpage/> } />
          <Route path="/allchar/:id/edit" element={ <EditCharacter/> } />
          <Route path="/newchar" element={ <Addcharacter/> } />
          <Route path="/contributions" element={ <Contributions/> } />
          <Route path="/history" element={ <History/> } />
          <Route path="/users/:name" element={ <UserProfile isProfile={true}/>} />
        </Route>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/comparison" element={ <Comparison/> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;