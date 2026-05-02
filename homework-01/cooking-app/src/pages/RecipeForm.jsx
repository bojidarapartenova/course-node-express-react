import React, { useState } from "react";
import { useNavigate } from "react-router";

const RecipeForm = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipeData({ ...recipeData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const ingredientsArr = recipeData.ingredients.split(', ').map(i => i.trim());
        const tagsArr = recipeData.tags.split(', ').map(t => t.trim());

        const newRecipe = {
            id: Math.random().toString(36).substring(2, 9),
            userId: user.id,
            title: recipeData.title,
            shortDescription: recipeData.shortDescription,
            cookingTime: parseInt(recipeData.cookingTime),
            ingredients: ingredientsArr,
            image: recipeData.image,
            detailedDescription: recipeData.detailedDescription,
            tags: tagsArr,
            datePublished: new Date().toISOString(),
            dateModified: new Date().toISOString()
        };

        try {
            const response = await fetch('http://localhost:4000/recipes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newRecipe)
            });

            if (response.ok) {
                navigate('/recipes');
            }
        }
        catch (error) {
            setError('Could not add the recipe.')
        }
    };

    if (!user) return <h2>Login or register to add recipes.</h2>;

    return (
        <div style={{ maxWidth: '600px', margin: 'auto' }}>
            <h2>New Recipe</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input name="title" placeholder="Recipe name" maxLength="80" onChange={handleChange} required />
                <textarea name="shortDescription" placeholder="Short description" maxLength="256" onChange={handleChange} required />
                <input name="cookingTime" type="number" placeholder="Time" onChange={handleChange} required />
                <input name="ingredients" placeholder="Ingredients" onChange={handleChange} required />
                <input name="image" placeholder="Image" onChange={handleChange} required />
                <textarea name="detailedDescription" placeholder="Description" maxLength="2048" onChange={handleChange} required />
                <input name="tags" placeholder="tags" onChange={handleChange} required />

                <button type="submit" style={{ padding: '10px', background: 'green', color: 'white', border: 'none' }}>
                    Share
                </button>
            </form>
        </div>
    );
};

export default RecipeForm;