import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import axios from 'axios';
import '../styling/Login.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsAuthenticated, setUser_id } = useCart();
  const navigate = useNavigate();

  const handleLogin = () => {
    const loginData = {
      email,
      password
    };

    axios.post('http://localhost:8080/api/login/check-login', loginData , { headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        if (response.status === 200) {
          setIsAuthenticated(true);
          console.log(response.data)
          setUser_id(response.data);
          navigate('/');
        } 
        else {
          alert('Login failed');
        }
      })
      .catch(error => {
        console.error('Error logging in', error);
        alert('Login failed');
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <form>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign up now</Link></p>
    </div>
  );
};

export default LoginPage;
