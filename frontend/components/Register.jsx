import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function registerUser(event) {
        event.preventDefault();

        try {
            const response = await axios.post('https://login-jwt-api.vercel.app/register', {
                name,
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = response.data;
            console.log(data);

            if (data.status === 'ok') {
                navigate('/');
            }
        } catch (error) {
            console.error('Error registering user:', error);
            alert('An error occurred while registering user');
        }
    }

    const handleSignup = () => {
        navigate('/');
    };

    return (
        <div id="container"> 
    <div className="top">
        <h1>Register</h1>
    </div>
    <form onSubmit={registerUser}>
        {/* Name */}
        <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
        />

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
        <input className="button" type="submit" value="Register" />
    </form>
    <div className="login_option">

    <p>Already a user? <span className="signup" onClick={handleSignup}>Login</span></p>
    </div>
        
</div>

    );
}

export default Register;
