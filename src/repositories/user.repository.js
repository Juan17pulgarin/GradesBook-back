import { pool } from '../config/database.js';

export const findUserByDocumento = async (documento) => {
  const query = 'SELECT id, email, password, tipo, nombres, apellidos, documento FROM usuarios WHERE documento = $1 AND activo = TRUE';
  const { rows } = await pool.query(query, [documento]);
  return rows[0];
};

export const createUser = async (userData) => {
  const { nombres, apellidos, email, password, tipo, documento, telefono } = userData;
  
  const query = `
    INSERT INTO usuarios (nombres, apellidos, email, password, tipo, documento, telefono)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id, email, nombres, apellidos, tipo;
  `;

  const values = [nombres, apellidos, email, password, tipo, documento, telefono];
  const { rows } = await pool.query(query, values);
  return rows[0];
};