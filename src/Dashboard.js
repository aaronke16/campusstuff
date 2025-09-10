import React from 'react';
import { useAuth } from './AuthContext';
import UserMenu from './UserMenu';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>CampusFash Dashboard</h1>
          <UserMenu />
        </div>
      </header>

      <main className="dashboard-main">
        <div className="welcome-section">
          <h2>Welcome to CampusFash! 👋</h2>
          <p>You're successfully logged in with {user.provider}.</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>🛍️ Browse Fashion</h3>
            <p>Discover the latest campus fashion trends</p>
            <button className="card-btn">Explore</button>
          </div>
          
          <div className="dashboard-card">
            <h3>👤 Browse Furniture</h3>
            <p>Manage your profile and preferences</p>
            <button className="card-btn">View Furniture</button>
          </div>
          
          <div className="dashboard-card">
            <h3>💬 Browse Appliances</h3>
            <p>Connect with other fashion enthusiasts</p>
            <button className="card-btn">View Appliances</button>
          </div>
          
        </div>

        {/* <div className="user-profile-section">
          <h3>Your Profile Information</h3>
          <div className="profile-info">
            <div className="info-row">
              <strong>Name:</strong> {user.name}
            </div>
            <div className="info-row">
              <strong>Email:</strong> {user.email}
            </div>
            <div className="info-row">
              <strong>Provider:</strong> {user.provider}
            </div>
            <div className="info-row">
              <strong>User ID:</strong> {user.id}
            </div>
          </div>
        </div> */}
      </main>
    </div>
  );
};

export default Dashboard;
