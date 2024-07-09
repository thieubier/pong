// frontend/src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/Signup.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/users/register', {
                username,
                email,
                password,
                role,
            });
            console.log(response.data);
            navigate('/login');
        } catch (err) {
            setError('Failed to create account');
        }
    };

    return (
        <div className="signup-container">
            <h1 className="signup-title">Créer un compte</h1>
            {error && <p className="error-message">{error}</p>}
            <form className="signup-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    className="signup-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="signup-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="signup-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Role"
                    className="signup-input"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                />
                <button type="submit" className="signup-button">Créer un compte</button>
            </form>
        </div>
    );
};

export default Signup;
