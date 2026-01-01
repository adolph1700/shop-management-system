import React, { useState } from "react";

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
      console.log(response.json())

      const result = await response.json();

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
        role: "USER"
      });
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2>Create Account</h2>

      {successMessage && <p className="success">{successMessage}</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}

      <form onSubmit={handleSubmit} noValidate>
        <Input name="firstName" placeholder="First Name" onChange={handleChange} />
        <Input name="lastName" placeholder="Last Name" onChange={handleChange} />
        <Input name="username" placeholder="Username" onChange={handleChange} />
        <Input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <Input name="phoneNumber" placeholder="Phone Number" onChange={handleChange} />
        <Input type="password" name="password" placeholder="Password" onChange={handleChange} />

        <button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

/* Reusable Input Component */
const Input = ({ type = "text", ...props }) => (
  <input type={type} required {...props} />
);

export default Signup;
