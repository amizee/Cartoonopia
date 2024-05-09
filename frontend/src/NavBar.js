import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NavBar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="top-bar">
            <h1 className="logo-title">Cartoonopia!</h1>
            <button className="nav-button" onClick={() => navigate('/home')}>Go Home</button>
            <button className="nav-button" onClick={() => navigate('/home')}>User Profile</button>
            <button className="nav-button" onClick={() => navigate('/home')}>All Users</button>
            <button className="nav-button" onClick={() => navigate('/allchar')}>All Characters</button>
            {user.isAdmin ? (
                <button className="nav-button" onClick={() => navigate('/contributions')}>Contributions</button>
            ) : (
              <div></div>
            )}
            {user.isAdmin ? (
                <button className="nav-button" onClick={() => navigate('/history')}>History</button>
            ) : (
              <div></div>
            )}
        </div>
    );
}

export default NavBar;



