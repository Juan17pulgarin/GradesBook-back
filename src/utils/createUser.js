import bcrypt from 'bcrypt';
import { pool } from '../config/database.js';

const createAdmin = async () => {
  const saltRounds = 10;
  const passwordPlana = 'admin123';
  const hashedPassword = await bcrypt.hash(passwordPlana, saltRounds);

  const query = `
    INSERT INTO usuarios (
      email, password, tipo, nombres, apellidos, documento, telefono, activo
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING id, email;
  `;

  const values = [
    'admin@gradesbook.com',
    hashedPassword,
    'ADMINISTRADOR',
    'Admin',
    'GradesBook',
    '10001',
    '555555',
    true
  ];

  try {
    const res = await pool.query(query, values);
    console.log('Usuario administrador creado con éxito:', res.rows[0]);
    process.exit(0);
  } catch (err) {
    console.error('Error al crear el usuario:', err.message);
    process.exit(1);
  }
};

createAdmin();