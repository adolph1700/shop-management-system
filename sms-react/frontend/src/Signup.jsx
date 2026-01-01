import React, { useState } from "react";
import "./Signup.css";

const API_URL = "http://localhost:8080/user/signup";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "CUSTOMER"
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          passwordHash: formData.password
        })
      });

      const result = await response.json();
      console.log(result);

      if (!response.ok) {
        throw new Error(result.message || "Signup failed");
      }

      setSuccessMessage("Signup successful 🎉");
      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "CUSTOMER"
      });
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      
      <div className="signup-container">
        <div className="signup-header">
          <h2>Create Account</h2>
          <p>Join us and manage your shop efficiently</p>
        </div>

        {successMessage && <div className="message success">{successMessage}</div>}
        {errorMessage && <div className="message error">{errorMessage}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="input-group">
            <Input 
              name="firstName" 
              value={formData.firstName} 
              onChange={handleChange} 
              label="First Name"
            />
            <Input 
              name="lastName" 
              value={formData.lastName} 
              onChange={handleChange} 
              label="Last Name"
            />
          </div>
          
          <Input 
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
            label="Username"
          />
          
          <Input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            label="Email Address"
          />
          
          <Input 
            name="phoneNumber" 
            value={formData.phoneNumber} 
            onChange={handleChange} 
            label="Phone Number"
          />
          
          <div className="password-container">
            <Input 
              type={showPassword ? "text" : "password"} 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              label="Password"
            />
            <button 
              type="button" 
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? <span className="loader"></span> : "Sign Up"}
          </button>
        </form>
        
        <div className="signup-footer">
          <p>Already have an account? <a href="/login">Log in</a></p>
        </div>
      </div>
    </div>
  );
};

/* Reusable Input Component with Floating Label */
const Input = ({ type = "text", label, value, ...props }) => (
  <div className="floating-label-group">
    <input 
      type={type} 
      className="floating-input" 
      placeholder=" " 
      value={value}
      required 
      {...props} 
    />
    <label className="floating-label">{label}</label>
  </div>
);

export default Signup;
