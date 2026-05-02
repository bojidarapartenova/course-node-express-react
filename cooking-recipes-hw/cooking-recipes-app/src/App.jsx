import { BrowserRouter as Router, Routes, Route, Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user, logout } = useContext(AuthContext);

  return (
    <Router>
      <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
        <Link to="/">Home</Link> |
        {!user ? (
          <>
            <Link to="/login"> Login</Link> |
            <Link to="/register"> Register</Link>
          </>
        ) : (
          <>
            <span> Hello, {user.username}! </span>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<h1>Home (Recipes)</h1>} />
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="/register" element={<h1>Register</h1>} />
      </Routes>
    </Router>
  )
}