import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { API } from "../services/api";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        gender: 'male',
        role: 'user',
        image: '',
        description: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const usernameRegex = /^\w{1,15}$/;
        if (!usernameRegex.test(formData.username)) {
            setError('Username must be up to 15 symbols.');
            return;
        }

        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            setError('Password must be at least 8 symbols, containing at least one digit and one special character.');
            return;
        }

        if (formData.description.length > 512) {
            setError('Description must be under 512 symbols.');
            return;
        }

        const defaultAvatar = formData.gender === 'male'
            ? 'https://www.w3schools.com/howto/img_avatar.png'
            : 'https://www.w3schools.com/howto/img_avatar2.png';

        const now = new Date().toISOString();

        const userData = {
            ...formData,
            image: formData.image || defaultAvatar,
            status: 'active',
            registrationDate: now,
            modificationDate: now
        };

        try {
            const newUser = await API.registerUser(userData);

            if (newUser) {
                sessionStorage.setItem('loggedUser', JSON.stringify(newUser));
                navigate('/');
                window.location.reload();
            }
        } catch (err) {
            setError('Error connecting to the server. Please try again.');
            console.error(err);
        }
    };

    return (
        <div style={formCardStyle}>
            <h2 style={formTitleStyle}>Create Account</h2>

            {error && <div style={errorBannerStyle}>{error}</div>}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={inputGroupStyle}>
                    <label style={labelStyle}>Full Name:</label>
                    <input name="name" type="text" placeholder="Enter your full name" onChange={handleChange} required style={inputStyle} />
                </div>

                <div style={inputGroupStyle}>
                    <label style={labelStyle}>Username:</label>
                    <input name="username" type="text" placeholder="Choose a username" onChange={handleChange} required style={inputStyle} />
                </div>

                <div style={inputGroupStyle}>
                    <label style={labelStyle}>Password:</label>
                    <input name="password" type="password" placeholder="Choose a secure password" onChange={handleChange} required style={inputStyle} />
                </div>

                <div style={inputGroupStyle}>
                    <label style={labelStyle}>Gender:</label>
                    <select name="gender" onChange={handleChange} style={inputStyle}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <div style={inputGroupStyle}>
                    <label style={labelStyle}>Profile Image URL:</label>
                    <input name="image" type="text" placeholder="Paste image link (Optional)" onChange={handleChange} style={inputStyle} />
                </div>

                <div style={inputGroupStyle}>
                    <label style={labelStyle}>Bio:</label>
                    <textarea
                        name="description"
                        placeholder="Tell us about yourself..."
                        maxLength="512"
                        onChange={handleChange}
                        style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
                    />
                </div>

                <button type="submit" style={submitButtonStyle}>
                    Register
                </button>
            </form>

            <p style={footerTextStyle}>
                Already have an account? <Link to="/login" style={linkStyle}>Login here</Link>
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

export default Register;