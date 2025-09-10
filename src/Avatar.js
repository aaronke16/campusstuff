import React from 'react';
import './Avatar.css';

const Avatar = ({ user, size = 'medium', showName = false }) => {
  const sizeClasses = {
    small: 'avatar-small',
    medium: 'avatar-medium', 
    large: 'avatar-large'
  };

  // Generate a consistent color based on user's name
  const getAvatarColor = (name) => {
    if (!name) return '#667eea';
    
    const colors = [
      '#667eea', '#764ba2', '#f093fb', '#f5576c',
      '#4facfe', '#00f2fe', '#43e97b', '#38f9d7',
      '#ffecd2', '#fcb69f', '#a8edea', '#fed6e3'
    ];
    
    const charCode = name.charCodeAt(0) + name.length;
    return colors[charCode % colors.length];
  };

  // Get initials from name
  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const avatarStyle = {
    backgroundColor: getAvatarColor(user?.name)
  };

  return (
    <div className={`avatar-container ${showName ? 'with-name' : ''}`}>
      <div className={`avatar ${sizeClasses[size]}`}>
        {user?.picture ? (
          <img 
            src={user.picture} 
            alt={`${user.name}'s profile`}
            onError={(e) => {
              // Fallback if image fails to load
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        
        <div 
          className="avatar-fallback"
          style={avatarStyle}
        >
          {getInitials(user?.name)}
        </div>
      </div>
      
      {showName && user?.name && (
        <span className="avatar-name">{user.name}</span>
      )}
    </div>
  );
};

export default Avatar;
