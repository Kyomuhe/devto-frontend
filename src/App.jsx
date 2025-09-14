import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/main";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import SignupFlow from "./components/signup/SignupFlow";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signup-flow" element={<SignupFlow />} />
      </Routes>
    </Router>
  );
}

export default App;
