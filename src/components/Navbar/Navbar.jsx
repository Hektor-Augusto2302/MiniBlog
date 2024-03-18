import { useAuth } from "../../context/authContext";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import useAuthentication from "../../hooks/useAuthentication";

const Navbar = () => {
  const { user } = useAuth();
  const { logOut } = useAuthentication();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/login')
    } catch (error) {
      console.error("Erro ao fazer logout:", error.message);
    }
  }

  return (
    <nav className={`d-flex justify-content-between align-items-center navbar navbar-expand-sm ${styles.navbar}`}>
      <div className="container">
        <NavLink className={`${styles.brand} navbar-brand`} to="/">
          Mini <span>Blog</span>
        </NavLink>
        <div className="d-flex flex-column justify-content-end">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="bi bi-text-left"></i>
          </button>
          <ul className={`navbar-nav collapse navbar-collapse ${styles.navbarCollaseMidia}`} id="navbarNav">
            {!user ? (
              <>
                <li className={`${styles.linksNav} links nav-item me-3`}>
                  <NavLink className={({ isActive }) => (isActive ? styles.active : "")} to="/login">
                    Entrar
                  </NavLink>
                </li>
                <li className={`${styles.linksNav} links nav-item me-3`}>
                  <NavLink className={({ isActive }) => (isActive ? styles.active : "")} to="/register">
                    Registrar
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className={`${styles.linksNav} links nav-item me-3`}>
                  <NavLink className={({ isActive }) => (isActive ? styles.active : "")} to="/">
                    Home
                  </NavLink>
                </li>
                <li className={`${styles.linksNav} links nav-item me-3`}>
                  <NavLink className={({ isActive }) => (isActive ? styles.active : "")} to="/post">
                    Novo Post
                  </NavLink>
                </li>
                <li className={`${styles.linksNav} links nav-item me-3`}>
                  <NavLink className={({ isActive }) => (isActive ? styles.active : "")} to="/about">
                    Sobre
                  </NavLink>
                </li>
                <li>
                  <button onClick={handleLogout}>Sair</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;