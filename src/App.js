import React, { useState, useEffect } from 'react';
import { Link, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import img1 from './img1.png'; 
import AddGroup from './AddGroup';
import Note from './Note';

const App = () => {
  const [groups, setGroups] = useState(() => {
    const savedGroups = localStorage.getItem('groups');
    return savedGroups ? JSON.parse(savedGroups) : [];
  });
  
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    localStorage.setItem('groups', JSON.stringify(groups));
  }, [groups]);

  const addGroup = (newGroup) => {
    const updatedGroups = [...groups, { ...newGroup, notes: [] }];
    setGroups(updatedGroups);
    setSelectedGroup(null);
  };

  const setGroupNotes = (updatedGroup) => {
    const updatedGroups = groups.map(group => 
      group.id === updatedGroup.id ? updatedGroup : group
    );
    setGroups(updatedGroups);
    setSelectedGroup(updatedGroup);
  };

  const deleteGroup = (groupId) => {
    const updatedGroups = groups.filter(group => group.id !== groupId);
    setGroups(updatedGroups);
    if (selectedGroup?.id === groupId) {
      setSelectedGroup(null);
    }
  };
  
  const handleGroupClick = (group) => {
    setSelectedGroup(group);
  };

  return (
    <div className='main-page'>
      <div className='sidebar'>
        <h1>Pocket Notes</h1>
        <div className="sidebar-content">
          <ul>
            {groups.map(group => (
              <li 
                key={group.id} 
                className={`group-item ${selectedGroup?.id === group.id ? 'active' : ''}`} 
                onClick={() => handleGroupClick(group)}
              >
                <span
                  className='group-circle'
                  style={{ backgroundColor: group.color }}
                >
                  {group.initials}
                </span>  
                {group.name}
                <button className='delete-btn' onClick={() => deleteGroup(group.id)}>🗑️</button>
              </li>
            ))}
          </ul>
        </div>
        <div className='NoteButton'>
          <Link to="/add-group">
            <button className='AddButton'>+</button>
          </Link>
        </div>
      </div>
      <div className='content'>
        <div className='content-wrapper'>
          {selectedGroup ? (
            <Note group={selectedGroup} setGroupNotes={setGroupNotes} />
          ) : (
            <div>
              <div className='img1'>
                <img src={img1} alt='img1' />
              </div>
              <h2>Pocket Notes</h2>
              <p>
                Send and receive messages without keeping your phone online.<br />
                Use Pocket Notes on up to 4 linked devices and 1 mobile phone.
              </p>
            </div>
          )}
        </div>
      </div>

      <Routes>
        <Route path="/add-group" element={<AddGroup addGroup={addGroup} />} />
        <Route path="/" element={selectedGroup ? <Navigate to="/" /> : null} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
