import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { isAuthenticated, logout, getCurrentUser } from "../utils/auth.js";

export default function Navbar() {
  const navigate = useNavigate();

  const [authStatus, setAuthStatus] = useState(isAuthenticated());
  const [currentUser, setCurrentUser] = useState(getCurrentUser());

  useEffect(() => {
    const handleAuthChange = () => {
      setAuthStatus(isAuthenticated());
      setCurrentUser(getCurrentUser());
    };

    window.addEventListener("authChange", handleAuthChange);

    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    logout(navigate);
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/posts/new">New Post</Link>
        </li>

        {authStatus ? (
          <>
            {currentUser && currentUser.username ? (
              <li>
                <Link to={`/profile/${currentUser.username}`}>Profile</Link>
              </li>
            ) : (
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            )}
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
