import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch('http://localhost:5000/auth/user', {
          credentials: 'include',
        });
        const data = await res.json();
        if (data?.user) {
          setUser(data.user);
          navigate('/');
        } else {
          navigate('/login');
        }
      } catch (err) {
        console.error(err);
        navigate('/login');
      }
    };
    checkLogin();
  }, []);

  const isLoginPage = location.pathname === '/login';

  return (
    <div className={darkMode ? 'bg-dark text-light min-vh-100' : 'bg-light text-dark min-vh-100'}>
      {isLoginPage ? (
        // Render only login layout
        <Routes>
          <Route path="/login" element={<Login darkMode={darkMode} />} />
        </Routes>
      ) : (
        // Main layout for other pages
        <div className="container-fluid px-4 py-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="fw-bold">🎓 AI Course Advisor</h1>
                <button onClick={toggleMode} className="btn btn-outline-light">
                  {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
                </button>
              </div>
              <Routes>
                <Route path="/" element={<Home darkMode={darkMode} />} />
              </Routes>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
