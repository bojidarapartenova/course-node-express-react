import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const ManageRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();

    const fetchRecipes = () => {
        fetch('http://localhost:4000/recipes')
            .then(res => res.json())
            .then(data => setRecipes(data));
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this recipe?")) {
            await fetch(`http://localhost:4000/recipes/${id}`, { method: 'DELETE' });
            fetchRecipes();
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Manage Recipes</h2>
            <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Author (ID)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {recipes.map(r => (
                        <tr key={r.id}>
                            <td><img src={r.image} width="50" alt="" /></td>
                            <td>{r.title}</td>
                            <td>{r.userId}</td>
                            <td>
                                <button onClick={() => navigate(`/edit-recipe/${r.id}`)}>Edit</button>
                                <button onClick={() => handleDelete(r.id)} style={{ color: 'red', marginLeft: '10px' }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageRecipes;