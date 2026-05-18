import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { API } from "../services/api";

const ManageRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();

    const loadRecipes = async () => {
        try {
            const data = await API.getAllRecipes();
            setRecipes(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => { loadRecipes(); }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this recipe?")) {
            await API.deleteRecipe(id);
            setRecipes(prev => prev.filter(r => r.id !== id));
        }
    };

    return (
        <div style={panelContainerStyle}>
            <h2 style={panelTitleStyle}>Manage Recipes</h2>

            <div style={tableWrapperStyle}>
                <table style={tableStyle}>
                    <thead>
                        <tr style={tableHeaderRowStyle}>
                            <th style={thStyle}>Image</th>
                            <th style={thStyle}>Title</th>
                            <th style={thStyle}>Author ID</th>
                            <th style={{ ...thStyle, textAlign: 'center' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recipes.map(r => (
                            <tr key={r.id} style={tableBodyRowStyle}>
                                <td style={tdStyle}>
                                    <img src={r.image} width="60" height="40" alt="" style={thumbnailStyle} />
                                </td>
                                <td style={tdStyle}><strong>{r.title}</strong></td>
                                <td style={tdStyle}><code style={codeBadgeStyle}>{r.userId}</code></td>
                                <td style={{ ...tdStyle, textAlign: 'center' }}>
                                    <button onClick={() => navigate(`/edit-recipe/${r.id}`)} style={editBtnStyle}>Edit</button>
                                    <button onClick={() => handleDelete(r.id)} style={deleteBtnStyle}>Delete</button>
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
const thumbnailStyle = { objectFit: 'cover', borderRadius: '4px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', display: 'block' };
const codeBadgeStyle = { backgroundColor: '#f1f3f5', padding: '3px 6px', borderRadius: '4px', fontFamily: 'monospace', color: '#d63384' };

const editBtnStyle = { padding: '6px 14px', backgroundColor: '#ffc107', color: '#000', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '8px', fontWeight: '600', fontSize: '13px' };
const deleteBtnStyle = { padding: '6px 14px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' };

export default ManageRecipes;