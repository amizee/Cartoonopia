import React, { useEffect, useState } from 'react';
import api from './api.js';
import { Link, useNavigate } from 'react-router-dom';

import NavBar from './NavBar.js';

import './static/css/History.css';

function History() {
    const navigate = useNavigate();
    
    const [historyData, setHistoryData] = useState(null);
    
  useEffect(() => {
    async function fetchCharacters() {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await api.get('/history', { headers: {"Authorization" : `Bearer ${user.token}`} });
        console.log(response);
        setHistoryData(response.data);

      } catch (error) {
        console.log("Error fetching history: ", error);
      }
    }

    fetchCharacters();
  }, []);

    if (historyData === null) {
        return <div className="loading-message">Loading history...</div>;
    }

	return (
      <div className="App">
        <header className="App-header">
          <NavBar/>
          <h1 class="all-characters-header">Character Change History</h1>
        </header>

        <div>
            <div class="background-image-blur-whitewash"></div>
            {historyData &&
                Object.entries(historyData).map(([character, historyEntries]) => (
                    <div key={character}>
                      <div className="char-entry">
                        <h2 className ="ID-title">ID: {character}</h2>
                        {historyEntries.map(([changeData, changeAction], index) => (
                            <div key={index}>
                                {/* Check the value of changeAction and render different HTML accordingly */}
                                {changeAction.action === 'AddCharacter' && (
                                    <div className="entry-add">
                                        {/* HTML for action1 */}
                                        <div>
                                          <p className="history-subtitle-small"><b>Action</b>: Add Character</p>
                                          <ul>
                                              {Object.entries(changeData).map(([field, value]) => (
                                                  <li key={field} className='history-changes-made'>
                                                      <b>{field}</b>: {value}
                                                  </li>
                                              ))}
                                          </ul>
                                        </div>
                                        
                                        <div className = "action-details">
                                            <p className="history-subtitle-small"><b>Date</b>: {changeAction.date}</p>
                                            <p className="history-subtitle-small"><b>Submitted By</b>: {changeAction.user}</p>
                                            <p className="history-subtitle-small"><b>Approved By</b>: {changeAction.reviewed_by}</p>
                                        </div>
                                    </div>

                                    
                                )}
                                {changeAction.action === 'EditCharacter' && (
                                    <div className="entry-edit">
                                        {/* HTML for action2 */}
                                        <p className="history-subtitle-small"><b>Action</b>: Edit Character</p>
                                        <p className="history-subtitle-small"><b>Changes Made</b>: </p>
                                        <ul>
                                            {Object.entries(changeData).map(([field, values]) => (
                                                <li key={field} className="history-changes-made">
                                                    <b>{field}</b>: {values[0] !== null ? values[0] : 'None'} → {values[1]}
                                                </li>
                                            ))}
                                        </ul>
                                        <div>
                                            <p className="history-subtitle-small"><b>Date</b>: {changeAction.date}</p>
                                            <p className="history-subtitle-small"><b>Submitted By</b>: {changeAction.user}</p>
                                            <p className="history-subtitle-small"><b>Approved By</b>: {changeAction.reviewed_by}</p>
                                        </div>
                                    </div>
                                )}
                                {changeAction.action === 'DeleteCharacter' && (
                                    <div className="entry-delete">
                                        <p className="history-subtitle-small"><b>Action</b>: Delete Character</p>
                                        <p className="history-subtitle-small"><b>Date</b>: {changeAction.date}</p>
                                        <p className="history-subtitle-small"><b>Submitted By</b>: {changeAction.user}</p>
                                        <p className="history-subtitle-small"><b>Approved By</b>: {changeAction.reviewed_by}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                      </div>
                    </div>
                ))}
        </div>
      </div>
  );
}

export default History;
