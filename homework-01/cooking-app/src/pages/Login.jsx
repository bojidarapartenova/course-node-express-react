import React, { useState } from 'react';
import { useNavigate } from 'react-router';

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
            const res = await fetch(`http://localhost:4000/users?username=${credentials.username}&password=${credentials.password}`);
            const data = await res.json();

            if (data.length > 0) {
                const user = data[0];

                if (user.status === 'suspended') {
                    setError('Your profile was suspended.');
                    return;
                }

                const activatedUser = { ...user, status: 'active' };
                await fetch(`http://localhost:4000/users/${user.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(activatedUser)
                });

                sessionStorage.setItem('loggedUser', JSON.stringify(activatedUser));
                navigate('/');
                window.location.reload();
            } else {
                setError('Wrong username or password.');
            }
        } catch (err) {
            setError('Error connecting to server.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input name="username" placeholder="Username" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit" style={{ padding: '10px', background: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}>Login</button>
            </form>
        </div>
    );
};

export default Login;