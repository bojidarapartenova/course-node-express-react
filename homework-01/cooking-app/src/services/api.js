const BASE_URL = "http://localhost:4000";

export const API = {
    getAllUsers: () => fetch(`${BASE_URL}/users`).then(res => res.json()),
    getUserById: (id) => fetch(`${BASE_URL}/users/${id}`).then(res => res.json()),
    updateUser: (id, data) => fetch(`${BASE_URL}/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => res.json()),
    deleteUser: (id) => fetch(`${BASE_URL}/users/${id}`, { method: 'DELETE' }),
    registerUser: (data) => fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => res.json()),
    login: async (username, password) => {
        const users = await fetch(`${BASE_URL}/users`).then(res => res.json());
        return users.find(u => u.username === username && u.password === password);
    },

    getAllRecipes: () => fetch(`${BASE_URL}/recipes`).then(res => res.json()),
    getRecipeById: (id) => fetch(`${BASE_URL}/recipes/${id}`).then(res => res.json()),
    createRecipe: (data) => fetch(`${BASE_URL}/recipes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => res.json()),
    updateRecipe: (id, data) => fetch(`${BASE_URL}/recipes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => res.json()),
    deleteRecipe: (id) => fetch(`${BASE_URL}/recipes/${id}`, { method: 'DELETE' })
};