import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { API } from '../services/api';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const userJson = sessionStorage.getItem('loggedUser');

        if (!userJson) {
            navigate('/login');
            return;
        }

        API.getAllUsers().then(setUsers);
    }, [navigate]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await API.deleteUser(id);
                setUsers(users.filter(u => u.id !== id));
            } catch (err) {
                console.error("Error deleting user.", err);
            }
        }
    };

    return (
        <div style={panelContainerStyle}>
            <h2 style={panelTitleStyle}>Manage Users</h2>

            <div style={tableWrapperStyle}>
                <table style={tableStyle}>
                    <thead>
                        <tr style={tableHeaderRowStyle}>
                            <th style={thStyle}>Full Name</th>
                            <th style={thStyle}>Username</th>
                            <th style={thStyle}>Role</th>
                            <th style={thStyle}>Status</th>
                            <th style={{ ...thStyle, textAlign: 'center' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u.id} style={tableBodyRowStyle}>
                                <td style={tdStyle}><strong>{u.name}</strong></td>
                                <td style={tdStyle}>{u.username}</td>
                                <td style={tdStyle}>
                                    <span style={{ ...roleBadgeStyle, backgroundColor: u.role === 'admin' ? '#e3f2fd' : '#f8f9fa', color: u.role === 'admin' ? '#0d6efd' : '#495057' }}>
                                        {u.role}
                                    </span>
                                </td>
                                <td style={tdStyle}>
                                    <span style={{ ...statusBadgeStyle, backgroundColor: u.status === 'active' ? '#e8f5e9' : '#ffebee', color: u.status === 'active' ? '#198754' : '#dc3545' }}>
                                        {u.status}
                                    </span>
                                </td>
                                <td style={{ ...tdStyle, textAlign: 'center' }}>
                                    <button onClick={() => navigate(`/edit-user/${u.id}`)} style={editBtnStyle}>Edit</button>

                                    <button onClick={() => handleDelete(u.id)} style={deleteBtnStyle}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const panelContainerStyle = { maxWidth: '1100px', margin: '40px auto', padding: '0 20px', boxSizing: 'border-box' };
const panelTitleStyle = { fontSize: '2rem', fontWeight: 'bold', color: '#333', marginBottom: '20px', textAlign: 'left' };
const tableWrapperStyle = { backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '15px', boxShadow: '0 8px 25px rgba(0,0,0,0.15)', overflow: 'hidden', padding: '10px' };
const tableStyle = { width: '100%', borderCollapse: 'collapse', textAlign: 'left' };
const tableHeaderRowStyle = { borderBottom: '2px solid #dee2e6' };
const tableBodyRowStyle = { borderBottom: '1px solid #eee', transition: 'background-color 0.2s' };
const thStyle = { padding: '15px 12px', fontWeight: 'bold', color: '#444', fontSize: '15px' };
const tdStyle = { padding: '12px', color: '#333', fontSize: '14px', verticalAlign: 'middle' };

const roleBadgeStyle = { padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' };
const statusBadgeStyle = { padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' };

const editBtnStyle = { padding: '6px 14px', backgroundColor: '#ffc107', color: '#000', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '8px', fontWeight: '600', fontSize: '13px' };
const deleteBtnStyle = { padding: '6px 14px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' };

export default ManageUsers;