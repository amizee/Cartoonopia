import React, { useEffect, useState } from 'react';
import api from './api.js';
import { Link } from 'react-router-dom';

function Contributions() {

    const [contributions, setContributions] = useState([]);

    useEffect(() => {
        async function fetchContributions() {
          try {
            const user = JSON.parse(localStorage.getItem('user'));
            const response = await api.get('/contributions', { headers: {"Authorization" : `Bearer ${user.token}`} });
            console.log(response);
            setContributions(response.data);
          } catch (error) {
            console.error('Error fetching contributions:', error);
          }
        }
    
        fetchContributions();
      }, []);

    
    return(
        <div className="App">
            <header className="App-header">
            <h1>Contributions</h1>
            <nav>
                <ul>
                {contributions.map(c => (
                    <li key={c._id}>
                        <p><strong>Contribution ID:</strong> {c.contribution_id}</p>
                        <p>User ID: {c.user_id}</p>
                        <p>Action: {c.action}</p>
                        <p>Status: {c.status}</p>
                        <p>Reviewed By: {c.reviewed_by}</p>
                        <p>Date Submitted: {c.date}</p>
                        {c.data && (
                            <>
                                <p>Changes:</p>
                                <ul>
                                    {Object.entries(c.data).map(([key, value]) => (
                                        <li key={key}>
                                            <strong>{key}:</strong> {value}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </li>
                ))}
                </ul>
            </nav>
            </header>
        </div>
    );
}

export default Contributions;