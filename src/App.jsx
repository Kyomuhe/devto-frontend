import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Main from "./pages/main";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import SignupFlow from "./components/signup/SignupFlow";
import EmailSignup from "./components/emailSignup";
import MainLoggedin from "./pages/mainLoggedin";
import CreatePost from "./models/CreatePost";

const AppContent = () => {
  const navigate = useNavigate();
  const [userToken, setUserToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);


  // Check if user is already logged in on app load
useEffect(() => {
  const token = localStorage.getItem('authToken');
  const savedUser = localStorage.getItem('user');
  if (token && savedUser) {
    setUserToken(token);
    setUser(JSON.parse(savedUser));
    setIsAuthenticated(true);
  }
}, []);

  const handleSignupSuccess = (result) => {
    console.log('Account created successfully:', result);
    setUserToken(result.token);
    setIsAuthenticated(true);
    // Navigate to signup flow after successful account creation
    navigate('/signup-flow');
  };

  const handleSignupFlowComplete = (signupFlowData) => {
    console.log('Signup flow completed:', signupFlowData);
    // Navigate to main logged-in view
    navigate('/main-loggedin');
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setUserToken(null);
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleLogin = (loginResult) => {
    console.log('Login successful:', loginResult);
    setUserToken(loginResult.token);
    setUser(loginResult.user);   
    setIsAuthenticated(true);
    navigate('/main-loggedin');
  };

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route 
        path="/login" 
        element={<LoginPage onLoginSuccess={handleLogin} />} 
      />
      <Route path="/signup" element={<SignupPage />} />
      <Route 
        path="/signup-flow" 
        element={
          isAuthenticated ? (
            <SignupFlow onSignupFlowComplete={handleSignupFlowComplete} />
          ) : (
            <Navigate to="/email-signup" replace />
          )
        } 
      />
      <Route 
        path="/email-signup" 
        element={<EmailSignup onSignupSuccess={handleSignupSuccess} />} 
      />
      <Route 
        path="/main-loggedin" 
        element={
          isAuthenticated ? (
            <MainLoggedin 
            onLogout={handleLogout} 
            userToken={userToken}
            user={user}     

             />
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />
      <Route 
        path="/create-post" 
        element={
          isAuthenticated ? (
            <CreatePost userToken={userToken} />
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;