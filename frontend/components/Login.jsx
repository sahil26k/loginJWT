import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function loginUser(event) {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = response.data;
      console.log(data);

      if (data.collection) {
        alert('Login Successful');
        localStorage.setItem('token', data.collection);
        navigate('/home'); 
      } else {
        alert('Please check your email and password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred while logging in');
    }
  }

  const handleSignup = () => {
    navigate('/register'); 
  };

  return (
    <div id="container">
      <div className="top">
        <h1>Login</h1>
      </div>
      <form onSubmit={loginUser}>
        {/* Email */}
        <input 
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text" 
          placeholder="Email" 
        />
        
        {/* Password */}
        <input 
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password" 
          placeholder="Password" 
        />
        {/* Btn */}
        <input className="button" type="submit" value="Login" />
      </form>
      <div className="login_option">
        <p>Not a user? <span className="signup" onClick={handleSignup}>Signup</span></p>
      </div>
    </div>
  );
}

export default Login;
