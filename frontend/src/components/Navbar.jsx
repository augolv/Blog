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

  const linkClasses = "text-text-secondary hover:text-primary transition-colors duration-200 py-2 px-3 rounded-md";

  return (
    <nav className="bg-surface shadow-md">
      <div className="container mx-auto px-4">
        <ul className="flex items-center h-16">
          <li>
            <Link to="/" className={linkClasses}>
              Home
            </Link>
          </li>
          <li className="ml-4">
            <Link to="/posts/new" className={linkClasses}>
              New Post
            </Link>
          </li>

          {authStatus ? (
            <>
              {currentUser && currentUser.username ? (
                <li className="ml-auto">
                  <Link to={`/profile/${currentUser.username}`} className={linkClasses}>
                    {currentUser.username}
                  </Link>
                </li>
              ) : (
                <li className="ml-auto">
                  <Link to="/profile" className={linkClasses}>
                    Profile
                  </Link>
                </li>
              )}
              <li className="ml-4">
                <button onClick={handleLogout} className={`${linkClasses} hover:bg-red-500 hover:text-white`}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="ml-auto">
                <Link to="/login" className={linkClasses}>
                  Login
                </Link>
              </li>
              <li className="ml-4">
                <Link to="/register" className={linkClasses}>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
