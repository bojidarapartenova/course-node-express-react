import React from "react";
import { Link, useNavigate } from "react-router";

const Navbar = () => {
    const navigate = useNavigate();

    const userJson = sessionStorage.getItem('loggedUser');
    const user = userJson ? JSON.parse(userJson) : null;

    const handleLogout = () => {
        sessionStorage.removeItem('loggedUser');
        navigate('/login');
    };

    return (
        <nav style={{ padding: '10px', borderBottom: '1px solid #ccc', marginBottom: '20px', display: 'flex', gap: '15px' }}>
            <Link to="/">Home</Link>
            <Link to="/recipes">Recipes</Link>

            {user ? (
                <>
                    <Link to="/add-recipe">Add recipe</Link>
                    <Link to="/manage-recipe">Manage recipes</Link>
                    <span style={{ marginLeft: 'auto', fontWeight: 'bold' }}>
                        Hello, {user.name}! ({user.role})
                    </span>
                    <button onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</button>
                </>
            ) : (
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;