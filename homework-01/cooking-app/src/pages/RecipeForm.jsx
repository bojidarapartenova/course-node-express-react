import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { API } from '../services/api';

const RecipeForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const loggedUser = JSON.parse(sessionStorage.getItem('loggedUser'));

    const [recipe, setRecipe] = useState({
        title: '',
        description: '',
        prepTime: '',
        ingredients: '',
        image: '',
        detailedDescription: '',
        tags: ''
    });

    useEffect(() => {
        if (id) {
            API.getRecipeById(id).then(data => {
                setRecipe({
                    ...data,
                    ingredients: data.ingredients.join(', '),
                    tags: data.tags.join(', ')
                });
            });
        }
    }, [id]);

    if (!loggedUser) return <div style={{ padding: '20px' }}>Please, login first</div>;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const now = new Date().toISOString();

        const recipeData = {
            ...recipe,
            userId: loggedUser.id,
            prepTime: Number(recipe.prepTime),
            ingredients: recipe.ingredients.split(',').map(i => i.trim()).filter(Boolean),
            tags: recipe.tags.split(',').map(t => t.trim()).filter(Boolean),
            modificationDate: now
        };

        if (id) {
            await API.updateRecipe(id, recipeData);
        } else {
            recipeData.dateShared = now;
            await API.createRecipe(recipeData);
        }

        navigate('/recipes');
    };

    return (
        <div style={{ maxWidth: '600px', margin: '30px auto', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h2>{id ? 'Edit recipe' : 'Add new recipe'}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <label>Recipe name:</label>
                <input maxLength="80" value={recipe.title} onChange={e => setRecipe({ ...recipe, title: e.target.value })} required style={inputStyle} />

                <label>Prep time:</label>
                <input type="number" value={recipe.prepTime} onChange={e => setRecipe({ ...recipe, prepTime: e.target.value })} required style={inputStyle} />

                <label>Image URL:</label>
                <input type="url" value={recipe.image} onChange={e => setRecipe({ ...recipe, image: e.target.value })} required style={inputStyle} />

                <label>Short description:</label>
                <textarea maxLength="256" value={recipe.description} onChange={e => setRecipe({ ...recipe, description: e.target.value })} style={inputStyle} />

                <label>Products (comma seperated):</label>
                <input value={recipe.ingredients} onChange={e => setRecipe({ ...recipe, ingredients: e.target.value })} required style={inputStyle} />

                <label>Detailed description:</label>
                <textarea maxLength="2048" value={recipe.detailedDescription} onChange={e => setRecipe({ ...recipe, detailedDescription: e.target.value })} required style={{ ...inputStyle, minHeight: '120px' }} />

                <label>Tags (comma seperated):</label>
                <input value={recipe.tags} onChange={e => setRecipe({ ...recipe, tags: e.target.value })} style={inputStyle} />

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="button" onClick={() => navigate(-1)} style={{ padding: '10px', flex: 1 }}>Cancel</button>
                    <button type="submit" style={{ padding: '10px', flex: 2, background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Save</button>
                </div>
            </form>
        </div>
    );
};

const inputStyle = { padding: '8px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '14px' };

export default RecipeForm;