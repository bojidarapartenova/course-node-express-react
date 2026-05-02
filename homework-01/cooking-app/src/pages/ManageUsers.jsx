import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const currentUser = JSON.parse(sessionStorage.getItem('loggedUser'));

    const fetchUsers = () => {
        fetch('http://localhost:4000/users')
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.error("Грешка при зареждане:", err));
    };

    useEffect(() => {
        if (!currentUser || currentUser.role !== 'admin') {
            navigate('/');
            return;
        }
        fetchUsers();
    }, []);

    const handleSuspend = async (user) => {
        const newStatus = user.status === 'suspended' ? 'active' : 'suspended';
        await fetch(`http://localhost:4000/users/${user.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...user, status: newStatus })
        });
        fetchUsers();
    };

    const handleDelete = async (id) => {
        if (window.confirm("Сигурни ли сте, че искате да изтриете този потребител?")) {
            await fetch(`http://localhost:4000/users/${id}`, { method: 'DELETE' });
            fetchUsers();
        }
    };

    const getAvatar = (u) => {
        if (u.avatarUrl) return u.avatarUrl;
        return u.gender === 'male'
            ? 'https://avatar.iran.liara.run/public/boy'
            : 'https://avatar.iran.liara.run/public/girl';
    };

    return (
        <div style={{ padding: '30px' }}>
            <h2>Управление на потребители</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr style={{ background: '#f4f4f4', textAlign: 'left' }}>
                        <th style={cellStyle}>Аватар</th>
                        <th style={cellStyle}>Име</th>
                        <th style={cellStyle}>Роля</th>
                        <th style={cellStyle}>Статус</th>
                        <th style={cellStyle}>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u.id} style={{ borderBottom: '1px solid #ddd' }}>
                            <td style={cellStyle}><img src={getAvatar(u)} width="40" style={{ borderRadius: '50%' }} alt="" /></td>
                            <td style={cellStyle}>{u.name} {u.id === currentUser.id && " (Вие)"}</td>
                            <td style={cellStyle}>{u.role}</td>
                            <td style={cellStyle}>{u.status || 'deactivated'}</td>
                            <td style={cellStyle}>
                                {/* БУТОН ЗА РЕДАКТИРАНЕ (НОВ ИЗГЛЕД) */}
                                <button onClick={() => navigate(`/edit-user/${u.id}`)} style={editBtnStyle}>
                                    Edit
                                </button>

                                {u.id !== currentUser.id && (
                                    <>
                                        <button onClick={() => handleSuspend(u)} style={suspendBtnStyle}>
                                            {u.status === 'suspended' ? 'Activate' : 'Suspend'}
                                        </button>
                                        <button onClick={() => handleDelete(u.id)} style={deleteBtnStyle}>
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const cellStyle = { padding: '12px' };
const editBtnStyle = { background: '#007bff', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' };
const suspendBtnStyle = { marginLeft: '5px', background: '#ffc107', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' };
const deleteBtnStyle = { marginLeft: '5px', background: '#dc3545', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' };

export default ManageUsers;