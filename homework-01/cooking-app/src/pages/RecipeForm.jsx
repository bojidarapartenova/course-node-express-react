import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

const RecipeForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem('loggedUser'));

    const [recipeData, setRecipeData] = useState({
        title: '',
        shortDescription: '',
        cookingTime: 0,
        ingredients: '',
        image: '',
        detailedDescription: '',
        tags: ''
    });

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:4000/recipes/${id}`)
                .then(res => res.json())
                .then(data => {
                    setRecipeData({
                        ...data,
                        ingredients: data.ingredients ? data.ingredients.join(', ') : '',
                        tags: data.tags ? data.tags.join(', ') : ''
                    });
                })
                .catch(err => console.error("Error loading recipe:", err));
        }
    }, [id]);

    useEffect(() => {
        if (!id) {
            setRecipeData({
                title: '',
                shortDescription: '',
                cookingTime: 0,
                ingredients: '',
                image: '',
                detailedDescription: '',
                tags: ''
            });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipeData({ ...recipeData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const ingredientsArray = recipeData.ingredients.split(',').map(i => i.trim());
        const tagsArray = recipeData.tags.split(',').map(t => t.trim());

        const finalRecipe = {
            ...recipeData,
            userId: user.id,
            ingredients: ingredientsArray,
            tags: tagsArray,
            dateModified: new Date().toISOString()
        };

        if (!id) {
            finalRecipe.id = Math.random().toString(36).substring(2, 9);
            finalRecipe.datePublished = new Date().toISOString();
        }

        const url = id ? `http://localhost:4000/recipes/${id}` : 'http://localhost:4000/recipes';
        const method = id ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalRecipe)
            });

            if (response.ok) {
                navigate('/recipes');
            }
        } catch (error) {
            alert("Error connecting the server.");
        }
    };

    if (!user) return <h2 style={{ textAlign: 'center' }}>Please login.</h2>;

    return (
        <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '10px' }}>
            <h2 style={{ textAlign: 'center' }}>{id ? "📝 Edit recipe" : "🍳 Add new recipe"}</h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label>Recipe name:</label>
                    <input name="title" value={recipeData.title} onChange={handleChange} required style={inputStyle} />
                </div>

                <div>
                    <label>Short description:</label>
                    <textarea name="shortDescription" value={recipeData.shortDescription} onChange={handleChange} required style={inputStyle} />
                </div>

                <div>
                    <label>Time (min):</label>
                    <input name="cookingTime" type="number" value={recipeData.cookingTime} onChange={handleChange} required style={inputStyle} />
                </div>

                <div>
                    <label>Products (comma seperated):</label>
                    <input name="ingredients" value={recipeData.ingredients} onChange={handleChange} required style={inputStyle} />
                </div>

                <div>
                    <label>Image URL:</label>
                    <input name="image" value={recipeData.image} onChange={handleChange} required style={inputStyle} />
                </div>

                <div>
                    <label>Instructions:</label>
                    <textarea name="detailedDescription" value={recipeData.detailedDescription} onChange={handleChange} required style={{ ...inputStyle, height: '100px' }} />
                </div>

                <div>
                    <label>Tags (comma seperated):</label>
                    <input name="tags" value={recipeData.tags} onChange={handleChange} required style={inputStyle} />
                </div>

                <button type="submit" style={id ? editBtnStyle : addBtnStyle}>
                    {id ? "Save changes" : "Share"}
                </button>
            </form>
        </div>
    );
};

const inputStyle = { width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' };
const addBtnStyle = { padding: '12px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' };
const editBtnStyle = { ...addBtnStyle, background: '#fd7e14' };
export default RecipeForm;