import pool from './db.js';

export const findOrCreateUser = async (profile) => {
  const { id, displayName, emails } = profile;
  const email = emails[0].value;

  const res = await pool.query('SELECT * FROM users WHERE google_id = $1', [id]);
  if (res.rows.length > 0) return res.rows[0];

  const insertRes = await pool.query(
    'INSERT INTO users (google_id, name, email) VALUES ($1, $2, $3) RETURNING *',
    [id, displayName, email]
  );
  return insertRes.rows[0];
};