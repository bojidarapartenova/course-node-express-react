import React, { useEffect, useState } from "react";

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        fetch('http://localhost:4000/recipes')
            .then(res => res.json())
            .then(data => {
                const sorted = data.sort((a, b) =>
                    new Date(b.datePublished) - new Date(a.datePublished));

                setRecipes(sorted.slice(0, 10));
            });
        []
    });

    const filteredRecipes = recipes.filter(r => {
        const searchTerm = filter.toLowerCase();
        const titleMatch = r.title?.toLowerCase().includes(searchTerm);
        const tagsMatch = r.tags?.some(tag => tag?.toLowerCase().includes(searchTerm));
        return titleMatch || tagsMatch;
    });

    return (
        <div style={{ padding: '20px' }}>
            <h2>Latest recipes</h2>

            <input
                type="text"
                placeholder="Filer by tag ot name..."
                onChange={(e) => setFilter(e.target.value)}
                style={{ marginBottom: '20px', padding: '10px', width: '300px' }}
            />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {filteredRecipes.map(recipe => (
                    <div key={recipe.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px' }}>
                        <img src={recipe.image} alt={recipe.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                        <h3>{recipe.title}</h3>
                        <p><strong>Time:</strong> {recipe.cookingTime} min</p>

                        <p>{recipe.shortDescription.substring(0, 150)}...</p>

                        <div>
                            {recipe.tags.map(tag => (
                                <span key={tag} style={{ background: '#eee', margin: '2px', padding: '2px 5px', fontSize: '0.8em' }}>
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipeList;