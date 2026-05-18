import React from "react";
import { Link, useNavigate } from "react-router";

const Navbar = () => {
    const navigate = useNavigate();
    const userJson = sessionStorage.getItem('loggedUser');
    const user = userJson ? JSON.parse(userJson) : null;

    const handleLogout = () => {
        sessionStorage.removeItem('loggedUser');
        navigate('/login');
        window.location.reload();
    };

    return (
        <nav style={navStyle}>
            <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
                <Link to="/" style={linkStyle}>Home</Link>
                <Link to="/recipes" style={linkStyle}>Recipes</Link>
                {user && <Link to="/add-recipe" style={linkStyle}>+ Add Recipe</Link>}
            </div>

            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '20px' }}>
                {user ? (
                    <>
                        <div style={{ display: 'flex', gap: '20px', borderRight: '1px solid #dee2e6', paddingRight: '20px', alignItems: 'center' }}>
                            <Link to="/manage-users" style={linkStyle}>Manage Users</Link>
                            <Link to="/manage-recipes" style={linkStyle}>Manage Recipes</Link>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <img src={user.image} alt="avatar" style={avatarStyle} />
                            <span style={{ fontSize: '14px', color: '#333' }}>
                                <strong>{user.name}</strong> <span style={{ color: '#888', fontSize: '12px' }}>({user.role})</span>
                            </span>
                            <button onClick={handleLogout} style={logoutBtnStyle}>Logout</button>
                        </div>
                    </>
                ) : (
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <Link to="/login" style={loginBtnStyle}>Login</Link>
                        <Link to="/register" style={registerBtnStyle}>Register</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

const navStyle = {
    padding: '12px 40px',
    borderBottom: '1px solid #dee2e6',
    marginBottom: '0px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
};

const linkStyle = {
    textDecoration: 'none',
    color: '#495057',
    fontWeight: '600',
    fontSize: '15px',
    transition: 'color 0.2s'
};

const avatarStyle = {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    objectFit: 'cover',
    boxShadow: '0 2px 5px rgba(0,0,0,0.15)'
};

const loginBtnStyle = {
    ...linkStyle,
    color: '#28a745',
    padding: '8px 16px'
};

const registerBtnStyle = {
    ...linkStyle,
    color: '#ffffff',
    background: '#28a745',
    padding: '8px 18px',
    borderRadius: '6px',
    boxShadow: '0 4px 10px rgba(40, 167, 69, 0.2)'
};

const logoutBtnStyle = {
    padding: '6px 14px',
    backgroundColor: '#f8f9fa',
    color: '#dc3545',
    border: '1px solid #dc3545',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 'bold',
    transition: 'all 0.2s'
};

export default Navbar;