import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Main from "./pages/main";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import SignupFlow from "./components/signup/SignupFlow";
import EmailSignup from "./components/emailSignup";
import MainLoggedin from "./pages/mainLoggedin";
import CreatePost from "./models/CreatePost";
import MyPosts from "./components/MyPosts";
import EditPost from "./components/EditPost";
import BookmarkPage from "./components/BookMark";
import Dashboard from "./components/Dashboard";
import DashboardLayout from "./components/DashboardLayout";
import { Toaster } from "sonner";

const AppContent = () => {
  const navigate = useNavigate();
  const [userToken, setUserToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on app load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      try {
        //If both exist, parse the user JSON string back to an object
        const parsedUser = JSON.parse(savedUser);
        setUserToken(token);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
        // Clear invalid data
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const handleSignupSuccess = (result) => {
    console.log('Account created successfully:', result);
    const token = result.token;
    
    // Store token in localStorage
    localStorage.setItem('authToken', token);
    
    setUserToken(token);
    setIsAuthenticated(true);
    navigate('/signup-flow');
  };

  const handleSignupFlowComplete = (signupFlowData) => {
    console.log('Signup flow completed:', signupFlowData);    
    navigate('/main-loggedin');
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUserToken(null);
    setUser(null);
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleLogin = (loginResult) => {
    console.log('Login successful:', loginResult);
    const token = loginResult.token;
    const userData = loginResult.user;
    
    // Store both token and user in localStorage
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(userData));
    
    setUserToken(token);
    setUser(userData);
    setIsAuthenticated(true);
    navigate('/main-loggedin');
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route 
        path="/login" 
        element={
          isAuthenticated ? (
            <Navigate to="/main-loggedin" replace />
          ) : (
            <LoginPage onLoginSuccess={handleLogin} />
          )
        } 
      />
      <Route 
        path="/signup" 
        element={
          isAuthenticated ? (
            <Navigate to="/main-loggedin" replace />
          ) : (
            <SignupPage />
          )
        } 
      />
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
            <CreatePost user={user} userToken={userToken} />
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />
      <Route 
        element={
          isAuthenticated ? (
            <DashboardLayout user={user} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/my-posts" element={<MyPosts user={user} />} />
        <Route path="/bookmarks" element={<BookmarkPage user={user} />} />
      </Route>

      <Route 
        path="/edit-post/:postId" 
        element={
          isAuthenticated ? (
            <EditPost user={user} />
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
      <Toaster/>
      <AppContent />
    </Router>
  );
}

export default App;