import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NavBar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const onButtonClickLogOut = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div className="top-bar">
            <h1 className="logo-title">Cartoonopia!</h1>
            <button className="nav-button" onClick={() => navigate('/home')}>Home</button>
            <button className="nav-button" onClick={() => navigate('/user')}>User</button>
            <button className="nav-button" onClick={() => navigate('/allchar')}>Characters</button>
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
            <button className="nav-button" onClick={onButtonClickLogOut}>Logout</button>
            
        </div>
    );
}

export default NavBar;



