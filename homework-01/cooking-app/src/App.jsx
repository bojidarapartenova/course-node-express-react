import { Routes, Route } from "react-router";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import RecipeForm from "./pages/RecipeForm";
import RecipeList from "./pages/RecipeList";

const Home = () => <div>Home</div>;

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
      </Routes>
    </div>
  );
}

export default App;