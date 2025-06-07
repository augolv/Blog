import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { isAuthenticated, logout, getCurrentUser } from "../utils/auth.js";

export default function Navbar() {
  const navigate = useNavigate();
  const [authStatus, setAuthStatus] = useState(isAuthenticated());
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    setIsMenuOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const linkClasses = "block py-2 px-3 text-text-secondary rounded hover:text-primary md:hover:bg-transparent md:border-0 md:p-0";

  return (
    <nav className="bg-surface shadow-md">
      <div className="container mx-auto px-4 flex flex-wrap items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-text">Blog</span>
        </Link>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-text-secondary rounded-lg md:hidden hover:bg-border focus:outline-none focus:ring-2 focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          {isMenuOpen ? (
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
          ) : (
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          )}
        </button>

        <div className={`${isMenuOpen ? "block" : "hidden"} w-full md:block md:w-auto`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-border rounded-lg bg-surface md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li>
              <Link to="/" className={linkClasses} onClick={closeMenu}>
                Início
              </Link>
            </li>
            <li>
              <Link to="/posts/new" className={linkClasses} onClick={closeMenu}>
                Novo Post
              </Link>
            </li>
            {authStatus ? (
              <>
                {currentUser && currentUser.username && (
                  <li>
                    <Link to={`/profile/${currentUser.username}`} className={linkClasses} onClick={closeMenu}>
                      Perfil
                    </Link>
                  </li>
                )}
                <li>
                  <button onClick={handleLogout} className={`${linkClasses} w-full text-left`}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className={linkClasses} onClick={closeMenu}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className={linkClasses} onClick={closeMenu}>
                    Cadastro
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
