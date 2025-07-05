import React from 'react';

const Login = ({ darkMode }) => {
  const handleLogin = () => {
    window.open('http://localhost:5000/auth/google', '_self');
  };

  return (
    <div
      className={`d-flex justify-content-center align-items-center vh-100 ${
        darkMode ? 'text-light' : 'text-dark'
      }`}
      style={{
        background: darkMode
          ? 'linear-gradient(135deg, #1a1a1a, #333333)'
          : 'linear-gradient(135deg, #e0eafc, #cfdef3)',
      }}
    >
      <div
        className="p-5 rounded shadow-lg"
        style={{
          backdropFilter: 'blur(10px)',
          backgroundColor: darkMode ? 'rgba(33,33,33, 0.9)' : 'rgba(255, 255, 255, 0.85)',
          width: '100%',
          maxWidth: '420px',
          borderRadius: '1.5rem',
        }}
      >
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-2">🎓 AI Course Advisor</h2>
          <p className="text-muted small">
            Sign in with Google to personalize your course experience
          </p>
        </div>

        <button
          onClick={handleLogin}
          className="btn btn-outline-primary w-100 btn-lg d-flex align-items-center justify-content-center gap-2"
          style={{ fontWeight: '500' }}
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            style={{ width: '22px' }}
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;

