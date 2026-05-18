import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { API } from "../services/api";

const Home = () => {
    const userJson = sessionStorage.getItem('loggedUser');
    const user = userJson ? JSON.parse(userJson) : null;

    useEffect(() => {
        const fetchStats = async () => {
            try {
                await API.getAllRecipes();
                await API.getAllUsers();
            } catch (err) {
                console.error('Error connecting to the server. Please try again.', err);
            }
        };
        fetchStats();
    }, []);

    return (
        <div style={homeWrapperStyle}>
            <div style={containerStyle}>

                <header style={heroStyle}>
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '10px', color: '#fff', textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
                        Cooking Recipes
                    </h1>

                    {!user ? (
                        <div style={{ marginTop: '30px' }}>
                            <Link to="/register" style={primaryBtn}>Register now</Link>
                            <Link to="/login" style={secondaryBtn}>Login</Link>
                        </div>
                    ) : (
                        <div style={{ marginTop: '30px' }}>
                            <h3 style={{ color: '#ff7f00', textShadow: '1px 1px 4px rgba(0,0,0,0.6)', marginBottom: '15px' }}>
                                Welcome back, {user.name}!
                            </h3>
                            <Link to="/add-recipe" style={primaryBtn}>Add new recipe</Link>
                        </div>
                    )}
                </header>

                <section style={{ marginTop: '40px' }}>
                    <div style={gridStyle}>
                        <Link to="/recipes" style={cardStyle}>
                            <h3 style={{ margin: '0 0 10px 0', color: '#ff7f00' }}>See recipes →</h3>
                            <p style={{ margin: 0, color: '#666', fontSize: '0.95rem' }}>
                                See the newest ideas.
                            </p>
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
};

const homeWrapperStyle = {
    backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('https://images.unsplash.com/photo-1690983322857-0811d47fedfc?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29va2luZyUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    minHeight: 'calc(100vh - 80px)',
    width: '100%',
    marginTop: '-20px',
    paddingTop: '40px',
    paddingBottom: '40px',
    boxSizing: 'border-box'
};

const containerStyle = {
    maxWidth: '1000px',
    margin: '0 auto',
    textAlign: 'center',
    padding: '0 20px'
};

const heroStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    backdropFilter: 'blur(3px)',
    padding: '60px 20px',
    borderRadius: '20px',
    border: '1px solid rgba(255,255,255,0.1)',
    marginBottom: '40px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
};

const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '20px'
};

const cardStyle = {
    padding: '25px 20px',
    border: 'none',
    borderRadius: '15px',
    textDecoration: 'none',
    color: '#333',
    transition: 'transform 0.2s, box-shadow 0.2s',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
};

const primaryBtn = {
    display: 'inline-block',
    padding: '13px 30px',
    backgroundColor: '#ff7f00',
    color: '#fff',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 'bold',
    margin: '5px',
    boxShadow: '0 4px 15px rgba(255, 127, 0, 0.4)'
};

const secondaryBtn = {
    display: 'inline-block',
    padding: '13px 30px',
    border: '2px solid #fff',
    color: '#fff',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 'bold',
    margin: '5px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transition: '0.2s'
};



export default Home;