import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { PublicClientApplication } from '@azure/msal-browser';
import { useAuth } from './AuthContext';
import Avatar from './Avatar';
import './login.css';

// Microsoft Authentication Library (MSAL) configuration
const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_MICROSOFT_CLIENT_ID || 'your-microsoft-client-id',
    authority: 'https://login.microsoftonline.com/common',
    redirectUri: window.location.origin,
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { user, login, logout } = useAuth();

  useEffect(() => {
    // Initialize MSAL
    msalInstance.initialize();
  }, []);

  // Handle Google OAuth success
  const handleGoogleSuccess = async (credentialResponse) => {
    setIsLoading(true);
    setError('');
    
    try {
      // Decode the JWT token to get user info
      const decoded = JSON.parse(atob(credentialResponse.credential.split('.')[1]));
      
      const userData = {
        id: decoded.sub,
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
        provider: 'google'
      };
      
      login(userData, credentialResponse.credential);
      
      console.log('Google login successful:', userData);
      
    } catch (error) {
      console.error('Error processing Google login:', error);
      setError('Failed to process Google login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Google OAuth error
  const handleGoogleError = () => {
    setError('Google login failed. Please try again.');
    console.error('Google login failed');
  };

  // Handle Microsoft OAuth
  const handleMicrosoftLogin = async () => {
    setIsLoading(true);
    setError('');

    const loginRequest = {
      scopes: ['openid', 'profile', 'email'],
      prompt: 'select_account'
    };

    try {
      const response = await msalInstance.loginPopup(loginRequest);
      
      const userData = {
        id: response.account.localAccountId,
        email: response.account.username,
        name: response.account.name,
        provider: 'microsoft'
      };
      
      login(userData, response.accessToken);
      
      console.log('Microsoft login successful:', userData);
      
    } catch (error) {
      console.error('Microsoft login failed:', error);
      setError('Microsoft login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    
    // Clear Microsoft session if it exists
    if (msalInstance.getAllAccounts().length > 0) {
      msalInstance.logout();
    }
  };

  // No need for useEffect to check session - AuthContext handles it

  if (user) {
    return (
      <div className="login-container">
        <div className="welcome-card">
          <Avatar user={user} size="large" />
          <h2>Welcome, {user.name}!</h2>
          <p className="user-email">{user.email}</p>
          <p className="login-provider">Logged in with {user.provider}</p>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome to CampusFash</h1>
          <p>Sign in with your Google or Microsoft account to continue</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="login-options">
          <div className="google-login">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap={false}
              theme="outline"
              size="large"
              text="signin_with"
              shape="rectangular"
              disabled={isLoading}
            />
          </div>

          <div className="divider">
            <span>OR</span>
          </div>

          <button
            onClick={handleMicrosoftLogin}
            disabled={isLoading}
            className="microsoft-login-btn"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.4 24H0V12.6H11.4V24ZM24 24H12.6V12.6H24V24ZM11.4 11.4H0V0H11.4V11.4ZM24 11.4H12.6V0H24V11.4Z"
                fill="#00A4EF"
              />
            </svg>
            {isLoading ? 'Signing in...' : 'Sign in with Microsoft'}
          </button>
        </div>

        <div className="login-footer">
          <p>
            By signing in, you agree to our Terms of Service and Privacy Policy.
            Only Google and Microsoft accounts are supported.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;