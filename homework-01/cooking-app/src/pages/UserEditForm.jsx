import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { API } from '../services/api';

const UserEditForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        name: '',
        username: '',
        role: 'user',
        status: 'active',
        gender: 'male',
        image: '',
        description: ''
    });

    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`http://localhost:4000/users/${id}`)
            .then(res => res.json())
            .then(data => setUserData(data))
            .catch(err => setError("Error loading data."));
    }, [id]);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (userData.username.length > 15) {
            setError('Username must be up to 15 symbols.');
            return;
        }

        try {
            const updatedData = {
                ...userData,
                modificationDate: new Date().toISOString()
            };
            await API.updateUser(id, updatedData);

            const currentUser = JSON.parse(sessionStorage.getItem('loggedUser'));
            if (currentUser && currentUser.id === id) {
                sessionStorage.setItem('loggedUser', JSON.stringify(updatedData));
            }

            alert('Saved changes.');
            navigate('/manage-users');
        } catch (err) {
            setError("Error saving the data.");
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '40px auto', padding: '25px', border: '1px solid #ddd', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <h3 style={{ textAlign: 'center', color: '#333' }}>Edit user</h3>

            {error && <div style={{ color: 'white', background: '#dc3545', padding: '10px', borderRadius: '5px', marginBottom: '15px', fontSize: '14px' }}>{error}</div>}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label style={labelStyle}>Name:</label>
                    <input name="name" value={userData.name} onChange={handleChange} required style={inputStyle} />
                </div>

                <div>
                    <label style={labelStyle}>Username:</label>
                    <input name="username" value={userData.username} onChange={handleChange} required style={inputStyle} />
                </div>

                <div style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ flex: 1 }}>
                        <label style={labelStyle}>Role:</label>
                        <select name="role" value={userData.role} onChange={handleChange} style={inputStyle}>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div style={{ flex: 1 }}>
                        <label style={labelStyle}>Status:</label>
                        <select name="status" value={userData.status} onChange={handleChange} style={inputStyle}>
                            <option value="active">Active</option>
                            <option value="suspended">Suspended</option>
                            <option value="deactivated">Deactivated</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label style={labelStyle}>Bio:</label>
                    <textarea
                        name="description"
                        value={userData.description || ''}
                        onChange={handleChange}
                        maxLength="512"
                        style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button type="submit" style={saveBtnStyle}>
                        Save changes
                    </button>
                    <button type="button" onClick={() => navigate('/manage-users')} style={cancelBtnStyle}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

const labelStyle = { display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px', color: '#555' };
const inputStyle = { width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '5px', border: '1px solid #ccc' };

const saveBtnStyle = {
    flex: 2,
    padding: '12px',
    background: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold'
};

const cancelBtnStyle = {
    flex: 1,
    padding: '12px',
    background: '#f8f9fa',
    color: '#333',
    border: '1px solid #ccc',
    borderRadius: '5px',
    cursor: 'pointer'
};

export default UserEditForm;