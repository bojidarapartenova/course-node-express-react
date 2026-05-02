import React, { useState } from "react";
import { useNavigate } from "react-router";

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch(`http://localhost:4000/users?username=${credentials.username}`);
            const users = await response.json();

            if (users.length > 0) {
                const user = users[0];

                if (user.password == credentials.password) {
                    sessionStorage.setItem('loggedUser', JSON.stringify(user));
                    navigate('/');
                }
                else {
                    setError('Wrong password.');
                }
            }
            else {
                setError('User not found.');
            }
        }
        catch (error) {
            setError('Connection failed.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto' }}>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;