// CSS
import './App.css';

// React-router
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Login from './pages/Login/Login'
import Register from './pages/Register/Register';
import Post from './pages/Post/Post';

// Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { useAuth } from './context/authContext';
import PostDetails from './pages/PostDetails/PostDetails';
import { useDarkMode } from './context/darkModeContext';

function App() {
  const { user } = useAuth();
  const { darkMode } = useDarkMode();

  return (
      <div className={`App ${darkMode ? "dark-mode" : "light-mode"}`}>
        <BrowserRouter>
          <Navbar />
          <div className="container container-app">
            <Routes>
              <Route
                path='/'
                element={user ? <Home /> : <Navigate to='/login' />}
              />
              <Route
                path='/about'
                element={user ? <About /> : <Navigate to='/login' />}
              />
              <Route
                path='/posts/:id'
                element={user ? <PostDetails /> : <Navigate to='/login' />}
              />
              <Route
                path='/login'
                element={!user ? <Login /> : <Navigate to='/' />}
              />
              <Route
                path='/register'
                element={!user ? <Register /> : <Navigate to='/register' />}
              />
              <Route
                path='/post'
                element={user ? <Post /> : <Navigate to='/login' />}
              />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </div>
  );
}

export default App;
