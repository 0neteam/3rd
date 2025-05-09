// src/components/Register.js
import React, { useState } from "react";
import api from "../services/api";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/register", new URLSearchParams(formData));
      setMessage(response.data);
    } catch (error) {
      setMessage("회원가입 실패");
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        {/* ... (기존 코드) */}
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;