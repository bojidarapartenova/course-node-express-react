import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { API } from '../services/api';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const user = await API.login(credentials.username, credentials.password);

            if (user) {
                if (user.status === 'suspended') {
                    setError('Your profile is suspended.');
                    return;
                }

                const updatedUser = {
                    ...user,
                    status: 'active',
                    modificationDate: new Date().toISOString()
                };

                await API.updateUser(user.id, updatedUser);

                sessionStorage.setItem('loggedUser', JSON.stringify(updatedUser));

                navigate('/');
                window.location.reload();
            } else {
                setError('Wrong username or password.');
            }
        } catch (err) {
            setError('Error connecting to the server. Please try again.');
        }
    };

    return (
        <div style={formCardStyle}>
            <h2 style={formTitleStyle}>Login</h2>

            {error && <div style={errorBannerStyle}>{error}</div>}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={inputGroupStyle}>
                    <label htmlFor="username" style={labelStyle}>Username:</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Enter your username"
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />
                </div>

                <div style={inputGroupStyle}>
                    <label htmlFor="password" style={labelStyle}>Password:</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />
                </div>

                <button type="submit" style={submitButtonStyle}>
                    Login
                </button>
            </form>

            <p style={footerTextStyle}>
                Don't have an account? <Link to="/register" style={linkStyle}>Register here</Link>
            </p>
        </div>
    );
};

const formCardStyle = {
    maxWidth: '450px',
    margin: '50px auto',
    padding: '30px 25px',
    border: 'none',
    borderRadius: '15px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
    boxSizing: 'border-box'
};

const formTitleStyle = {
    textAlign: 'center',
    marginBottom: '25px',
    color: '#333',
    fontSize: '2rem',
    fontWeight: 'bold'
};

const errorBannerStyle = {
    backgroundColor: '#fff3f3',
    color: '#d32f2f',
    padding: '12px',
    borderRadius: '6px',
    marginBottom: '20px',
    border: '1px solid #ffcdd2',
    fontSize: '14px',
    textAlign: 'center',
    fontWeight: '500'
};

const inputGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
};

const labelStyle = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#444',
    textAlign: 'left'
};

const inputStyle = {
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '14px',
    backgroundColor: '#fff',
    outline: 'none',
    boxSizing: 'border-box',
    width: '100%'
};

const submitButtonStyle = {
    padding: '13px',
    backgroundColor: '#28a745',
    color: '#fff',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    marginTop: '10px',
    boxShadow: '0 4px 12px rgba(40, 167, 69, 0.3)',
    transition: 'background-color 0.2s'
};

const footerTextStyle = {
    marginTop: '20px',
    textAlign: 'center',
    fontSize: '14px',
    color: '#666'
};

const linkStyle = {
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: '600'
};

export default Login;