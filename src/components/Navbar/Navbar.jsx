import { useAuth } from "../../context/authContext";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import useAuthentication from "../../hooks/useAuthentication";
import { useDarkMode } from "../../context/darkModeContext";
import InputDarkMode from "../InputDarkMode/InputDarkMode";

const Navbar = () => {
  const { user } = useAuth();
  const { logOut } = useAuthentication();
  const { darkMode, toggleDarkMode } = useDarkMode();
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
    <nav className={`d-flex justify-content-between align-items-center navbar navbar-expand-sm ${darkMode ? styles.darkModenav: styles.lightModenav}`}>
      <div className="container">
        <NavLink className={`navbar-brand ${darkMode ? styles.darkModebrand: styles.lightModebrand}`} to="/">
          Mini <span>Blog</span>
        </NavLink>
        <button className={`${darkMode ? styles.darkModeButtonDark: styles.lightModeButtonLight}`}>
          <InputDarkMode
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />
        </button>
        <div className="d-flex flex-column justify-content-end">
          <button
            className={`navbar-toggler ${styles.navbarFocusNone} ${darkMode ? styles.darkModeNavbarToggle : styles.lightModeNavbarToggle}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className={`bi bi-text-left {${darkMode ? styles.darkModeIcon : styles.lightModeIcon}`}></i>
          </button>
          <ul className={`navbar-nav collapse navbar-collapse ${darkMode ? styles.darkModeMidia: styles.lightModeMidia}`} id="navbarNav">
            {!user ? (
              <>
                <li className={`${darkMode ? styles.darkModeLinks: styles.lightModeLinks} links nav-item`}>
                  <NavLink className={({ isActive }) => (isActive ? styles.active : "")} to="/login">
                    Entrar
                  </NavLink>
                </li>
                <li className={`${darkMode ? styles.darkModeLinks: styles.lightModeLinks} links nav-item`}>
                  <NavLink className={({ isActive }) => (isActive ? styles.active : "")} to="/register">
                    Registrar
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className={`${darkMode ? styles.darkModeLinks: styles.lightModeLinks} links nav-item`}>
                  <NavLink className={({ isActive }) => (isActive ? styles.active : "")} to="/">
                    Home
                  </NavLink>
                </li>
                <li className={`${darkMode ? styles.darkModeLinks: styles.lightModeLinks} links nav-item`}>
                  <NavLink className={({ isActive }) => (isActive ? styles.active : "")} to="/post">
                    Novo Post
                  </NavLink>
                </li>
                <li className={`${darkMode ? styles.darkModeLinks: styles.lightModeLinks} links nav-item`}>
                  <NavLink className={({ isActive }) => (isActive ? styles.active : "")} to="/about">
                    Sobre
                  </NavLink>
                </li>
                <li>
                  <button className={`${darkMode ? styles.darkModeButton: styles.lightModeButton}`} onClick={handleLogout}>Sair</button>
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
