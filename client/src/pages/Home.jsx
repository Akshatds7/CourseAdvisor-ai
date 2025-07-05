import React, { useState } from 'react';
import axios from 'axios';
import CourseCard from '../components/CourseCard';

function Home({ darkMode }) {
  const [goals, setGoals] = useState('');
  const [interests, setInterests] = useState('');
  const [courses, setCourses] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setCourses('');
    try {
      const res = await axios.post('http://localhost:5000/api/recommend', { goals, interests });
      setCourses(res.data.courses);
    } catch (error) {
      setCourses('Something went wrong. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="rounded-4 p-5 shadow-lg"
      style={{
        backgroundColor: darkMode ? '#1f1f1f' : '#ffffff',
        color: darkMode ? '#f8f9fa' : '#212529',
        transition: 'all 0.3s ease',
      }}
    >
      <form onSubmit={handleSubmit} noValidate>
        <h3 className="fw-bold text-center mb-4">🚀 Smart Course Recommendations</h3>

        <div className="mb-4">
          <label className="form-label fw-semibold">🎯 Your Goal</label>
          <input
            type="text"
            className="form-control form-control-lg rounded-3"
            placeholder="e.g. Become a full-stack developer"
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">💡 Your Interests</label>
          <input
            type="text"
            className="form-control form-control-lg rounded-3"
            placeholder="e.g. React, AI, Backend"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            required
          />
        </div>

        <div className="d-grid mb-3">
          <button type="submit" className="btn btn-primary btn-lg rounded-3">
            {loading ? (
              <div className="spinner-border spinner-border-sm text-light" role="status"></div>
            ) : (
              '🎓 Get Recommendations'
            )}
          </button>
        </div>
      </form>

      {!loading && courses && (
        <div className="mt-5">
          <h4 className="fw-bold text-info mb-3">📘 Recommendations:</h4>
          <CourseCard text={courses} darkMode={darkMode} />
        </div>
      )}
    </div>
  );
}

export default Home;
