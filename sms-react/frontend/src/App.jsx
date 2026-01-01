import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Signup";

const Home = () => (
  <div style={{ textAlign: "center", marginTop: "50px" }}>
    <h1>Welcome to Shop Management System</h1>
    <p>
      <a href="/signup">Sign Up</a> or <a href="/login">Login</a>
    </p>
  </div>
);

const Login = () => (
  <div style={{ textAlign: "center", marginTop: "50px" }}>
    <h1>Login Page</h1>
    <p>(Coming Soon)</p>
    <a href="/signup">Go to Signup</a>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
