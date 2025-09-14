import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/main";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import SignupFlow from "./components/signup/SignupFlow";
import EmailSignup from "./components/emailSignup";
import MainLoggedin from "./pages/mainLoggedin";
import CreatePost from "./models/CreatePost";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signup-flow" element={<SignupFlow />} />
        <Route path="/email-signup" element={<EmailSignup />} />
        <Route path="/main-loggedin" element={<MainLoggedin />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </Router>
  );
}

export default App;
