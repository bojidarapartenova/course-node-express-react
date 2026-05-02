import React, { useState } from "react";
import { useNavigate } from "react-router";

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
        status: 'active'
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.username.length > 15) {
            setError("Username must be no more than 15 symbols.");
            return;
        }

        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;;
        if (!passwordRegex.test(formData.password)) {
            setError("Password must be at least 8 symbols, contains digit and a special symbol.");
            return;
        }

        const newUser = {
            ...formData,
            id: Math.random().toString(36).substring(2, 9),
            registrationDate: new Date().toISOString(),
            modificationDate: new Date().toISOString(),
            image: formData.image || (formData.gender == 'male' ? 'default-male-avatar.png' : 'default-female-avatar.png')
        };

        try {
            const response = await fetch('http://localhost:4000/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser)
            });

            if (response.ok) {
                sessionStorage.setItem('loggedUser', JSON.stringify(newUser));
                navigate('/');
                window.location.reload();
            }

        }
        catch (error) {
            setError("Error connecting the server.");
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto' }}>
            <h2>Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Name" onChange={handleChange} required />

                <input name="username" placeholder="Username" onChange={handleChange} required />

                <input name="password" type="password" placeholder="Password" onChange={handleChange} required />

                <select name="gender" onChange={handleChange}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>

                <textarea name="description" placeholder="Bio" maxLength="512" onChange={handleChange} />

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;