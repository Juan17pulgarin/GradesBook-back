import { pool } from '../config/database.js';

export const findUserByEmail = async (email) => {
  const query = 'SELECT id, email, password, tipo, nombres, apellidos FROM usuarios WHERE email = $1 AND activo = TRUE';
  const { rows } = await pool.query(query, [email]);
  return rows[0];
};