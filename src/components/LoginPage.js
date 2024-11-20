import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api.js";
import "../assets/LoginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const { data } = await login(username, otp);
      console.log(data);
      localStorage.setItem("token", data.token);
      navigate("/quotes");
    } catch (error) {
      alert("Login failed.Wrong User or Wrong OTP.");
    }
  };

  return (
    <div>
      <h1 className="app-title">Crafto Quote APP</h1>
      <div className="login-container">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default LoginPage;
