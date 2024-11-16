import React, { useState } from 'react';
import './Header.css';

const Header = ({ grouping, sorting, onGroupingChange, onSortingChange, onSearchChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  return (
    <div className="header">
      <div className="header-content">
        <div className="display-dropdown">
          <button 
            className="display-button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="icon">≡</span> Display <span className="arrow">▼</span>
          </button>
          
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-item">
                <span>Grouping</span>
                <select 
                  value={grouping}
                  onChange={(e) => onGroupingChange(e.target.value)}
                >
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
              <div className="dropdown-item">
                <span>Ordering</span>
                <select 
                  value={sorting}
                  onChange={(e) => onSortingChange(e.target.value)}
                >
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          )}
        </div>
        
        {grouping === 'user' && (
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search users..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;