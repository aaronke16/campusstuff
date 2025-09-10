import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider, useAuth } from './AuthContext';
import Login from './login';
import Marketplace from './Marketplace';
import ProtectedRoute from './ProtectedRoute';
import './App.css';

const AppContent = () => {
  const { user } = useAuth();
  
  return (
    <div className="App">
      <Routes>
        <Route 
          path="/" 
          element={user ? <Navigate to="/dashboard" /> : <Login />} 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Marketplace />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

function App() {
  // Replace with your actual Google Client ID
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || 'your-google-client-id';

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
