import React, { useEffect, useState } from "react";
import { API } from "../services/api";

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [searchTag, setSearchTag] = useState('');
    const [searchAuthor, setSearchAuthor] = useState('');
    const [users, setUsers] = useState({});
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        setLoading(true);
        try {
            const allRecipes = await API.getAllRecipes();
            const sorted = allRecipes.sort((a, b) => new Date(b.dateShared) - new Date(a.dateShared));
            setRecipes(sorted.slice(0, 10));

            const userData = await API.getAllUsers();
            const userMap = {};
            userData.forEach(u => userMap[u.id] = u.name);
            setUsers(userMap);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadData(); }, []);

    const filteredRecipes = recipes.filter(r => {
        const matchesTag = searchTag === '' || r.tags.some(t => t.toLowerCase().includes(searchTag.toLowerCase()));
        const authorName = users[r.userId] || '';
        const matchesAuthor = searchAuthor === '' || authorName.toLowerCase().includes(searchAuthor.toLowerCase());
        return matchesTag && matchesAuthor;
    });

    if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Latest recipes</h2>
            </div>

            <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                <input type="text" placeholder="Filter by tag..." value={searchTag} onChange={e => setSearchTag(e.target.value)} style={filterInputStyle} />
                <input type="text" placeholder="Filter by author..." value={searchAuthor} onChange={e => setSearchAuthor(e.target.value)} style={filterInputStyle} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {filteredRecipes.map(r => (
                    <div key={r.id} style={cardStyle}>
                        <img src={r.image} alt={r.title} style={imageStyle} />
                        <div style={{ padding: '15px' }}>
                            <h3 style={{ margin: '0 0 10px 0' }}>{r.title}</h3>
                            <p style={{ fontSize: '13px', color: '#666' }}>Author: {users[r.userId] || 'Unknown'} | {r.prepTime} min.</p>
                            <p style={{ fontSize: '14px', color: '#333' }}>
                                {r.description?.substring(0, 150)}...
                            </p>
                            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginTop: '10px' }}>
                                {r.tags.map((t, idx) => <span key={idx} style={tagStyle}>#{t}</span>)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const filterInputStyle = { padding: '8px', borderRadius: '4px', border: '1px solid #ccc', flex: 1 };
const cardStyle = { border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' };
const imageStyle = { width: '100%', height: '200px', objectFit: 'cover' };
const tagStyle = { backgroundColor: '#e9ecef', padding: '3px 8px', borderRadius: '12px', fontSize: '12px' };

export default RecipeList;