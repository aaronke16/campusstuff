import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import Avatar from './Avatar';
import './UserMenu.css';

const UserMenu = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <div className="user-menu">
      <button 
        className="user-menu-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Avatar user={user} size="medium" />
        <div className="user-info">
          <span className="user-name">{user.name}</span>
          <span className="user-email">{user.email}</span>
        </div>
        <svg 
          className={`chevron ${isOpen ? 'open' : ''}`}
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor"
        >
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <div className="user-menu-dropdown">
          <div className="menu-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            View Profile
          </div>
          <div className="menu-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"></path>
            </svg>
            Settings
          </div>
          <div className="menu-divider"></div>
          <div className="menu-item logout" onClick={handleLogout}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16,17 21,12 16,7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
