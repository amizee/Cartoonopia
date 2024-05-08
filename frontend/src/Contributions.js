import React, { useEffect, useState } from 'react';
import api from './api.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Contributions() {

    const [contributions, setContributions] = useState([]);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        async function fetchContributions() {
          try {
            const user = JSON.parse(localStorage.getItem('user'));
            const response = await api.get('/contributions', { headers: {"Authorization" : `Bearer ${user.token}`} });
            setContributions(response.data);
          } catch (error) {
            console.error('Error fetching contributions:', error);
          }
        }
    
        fetchContributions();
      }, [contributions]);

    const handleSubmit = (e, id, status) => {
        e.preventDefault();

        // set configurations
        const config = {
            method: "put",
            url: "http://127.0.0.1:5000/contributions",
            headers: {"Authorization" : `Bearer ${user.token}`},
            data: {
                "contribution_id":id,
                "status" : status
            }
        };

        axios(config)
        .then((r) => {
            if (r.data.success === false) {
                window.alert("Error: " + r.data.message);
            }
        })
        .catch((error) => {
            error = new Error();
        });
    };

    
    return(
        <div className="App">
            <header className="App-header">
                <div className="top-bar">
                    <h1 className="logo-title">Cartoonopia!</h1>
                    <button className="nav-button" onClick={() => navigate('/home')}>Go Home</button>
                    <button className="nav-button" onClick={() => navigate('/home')}>User Profile</button>
                    <button className="nav-button" onClick={() => navigate('/home')}>All Users</button>
                    <button className="nav-button" onClick={() => navigate('/allchar')}>All Characters</button>
                </div>

                <h1 class="all-characters-header">Contributions</h1>
                <nav>
                    <ul>
                    {contributions.map(c => (
                        <div className="char-entry" key={c.contribution_id}>
                            <div className="char-box">
                                <div className="char-stats">
                                        <p>Contribution ID: {c.contribution_id}</p>
                                        <p>User ID: {c.user_id._id}</p>
                                        <p>Action: {c.action}</p>
                                        <p>Status: {c.status}</p>
                                        <p>Reviewed By: {c.reviewed_by ? c.reviewed_by._id : "Not Reviewed"}</p>
                                        <p>Date Submitted: {c.date}</p>
                                        {c.data && (
                                            <>
                                                <ul>    
                                                    <p>Changes:</p>
                                                    {Object.entries(c.data).map(([key, value]) => (
                                                        <li key={key}>
                                                            <strong>{key}:</strong> {value}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </>
                                        )}
                                </div>

                                {user.isAdmin && c.status === "Pending" ? (
                                    <div>
                                        <button className="edit-link" onClick={(e) => handleSubmit(e, c.contribution_id, "Approved")}>Approve</button>
                                        <button className="edit-link" onClick={(e) => handleSubmit(e, c.contribution_id, "Rejected")}>Reject</button>
                                    </div>
                                ) : (
                                <div></div>
                                )}
                            </div>
                        </div>
                    ))}
                    </ul>
                </nav>

            </header>
            <body>
                <div class="background-image-blur-whitewash"></div>
            </body>
        </div>
    );
}



export default Contributions;