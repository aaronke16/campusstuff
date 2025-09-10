import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './src/login';
import './App.css';

function App() {
  // Replace with your actual Google Client ID
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || 'your-google-client-id';

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <div className="App">
        <Login />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
