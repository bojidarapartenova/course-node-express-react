import { Routes, Route } from "react-router";
import Register from "./pages/Register";

const Home = () => <div>Home</div>;
const Login = () => <div>Login</div>;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;