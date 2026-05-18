import { Routes, Route } from "react-router";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import RecipeForm from "./pages/RecipeForm";
import RecipeList from "./pages/RecipeList";
import ManageRecipes from "./pages/ManageRecipes";
import ManageUsers from "./pages/ManageUsers";
import UserEditForm from "./pages/UserEditForm";
import Home from "./pages/Home";

function App() {
  return (
    <div className="container">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-recipe" element={<RecipeForm />} />
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/manage-recipes" element={<ManageRecipes />} />
        <Route path="/edit-recipe/:id" element={<RecipeForm />} />
        <Route path="/manage-users" element={<ManageUsers />} />
        <Route path="/edit-user/:id" element={<UserEditForm />} />
      </Routes>
    </div>
  );
}

export default App;