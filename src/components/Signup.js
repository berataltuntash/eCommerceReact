import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!name || !surname || !email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    if (!email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      alert('Password must contain at least 8 characters.');
      return;
    }
    const userData = {
      name,
      surname,
      email,
      password
    };

    axios.post('http://localhost:8080/api/login', userData, { headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        if (response.status === 201) {
          // Successfully signed up, navigate to the login page
          navigate('/login');
        } else {
          // Handle signup error
          console.error('Signup failed');
        }
      })
      .catch(error => {
        console.error('Error signing up', error);
      });
  };

  return (
    <div>
      <h1>Sign up</h1>
      <form>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
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
        <button type="button" onClick={handleSignup}>
          Sign up
        </button>
      </form>
      <p>Already have an account? <Link to="/login">Login now</Link></p>
    </div>
  );
};

export default SignupPage;
