import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

const UserEditForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: '',
        username: '',
        role: 'user',
        status: 'active'
    });

    useEffect(() => {
        fetch(`http://localhost:4000/users/${id}`)
            .then(res => res.json())
            .then(data => setUserData(data))
            .catch(err => console.error("Грешка:", err));
    }, [id]);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch(`http://localhost:4000/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        // Ако редактираш себе си, обнови сесията
        const currentUser = JSON.parse(sessionStorage.getItem('loggedUser'));
        if (currentUser.id === id) {
            sessionStorage.setItem('loggedUser', JSON.stringify(userData));
        }

        alert("Потребителят е обновен!");
        navigate('/manage-users');
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
            <h3>Редактиране на профил</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input name="name" value={userData.name} onChange={handleChange} placeholder="Име" required style={inputStyle} />
                <input name="username" value={userData.username} onChange={handleChange} placeholder="Потребител" required style={inputStyle} />

                <label>Роля:
                    <select name="role" value={userData.role} onChange={handleChange} style={inputStyle}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </label>

                <label>Статус:
                    <select name="status" value={userData.status} onChange={handleChange} style={inputStyle}>
                        <option value="active">Active</option>
                        <option value="suspended">Suspended</option>
                        <option value="deactivated">Deactivated</option>
                    </select>
                </label>

                <button type="submit" style={{ padding: '10px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Запази
                </button>
                <button type="button" onClick={() => navigate('/manage-users')} style={{ background: 'none', border: 'none', color: 'gray', cursor: 'pointer' }}>
                    Отказ
                </button>
            </form>
        </div>
    );
};

const inputStyle = { width: '100%', padding: '8px', boxSizing: 'border-box' };

export default UserEditForm;