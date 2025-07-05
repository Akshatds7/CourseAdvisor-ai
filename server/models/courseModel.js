import pool from './db.js';

export const saveCourse = async (userId, content) => {
  const result = await pool.query(
    'INSERT INTO courses (user_id, content) VALUES ($1, $2) RETURNING *',
    [userId, content]
  );
  return result.rows[0];
};

export const getCourses = async (userId) => {
  const result = await pool.query(
    'SELECT * FROM courses WHERE user_id = $1',
    [userId]
  );
  return result.rows;
};