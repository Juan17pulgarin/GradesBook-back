import { pool } from '../config/database.js';

export const createCourse = async (courseData) => {
  const { nombre, anio, capacidad_maxima, estado } = courseData;
  
  const query = `
    INSERT INTO cursos (nombre, anio, capacidad_maxima, estado)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  
  const values = [nombre, anio, capacidad_maxima, estado];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const findCourseByNameAndYear = async (nombre, anio) => {
  const query = 'SELECT * FROM cursos WHERE nombre = $1 AND anio = $2';
  const { rows } = await pool.query(query, [nombre, anio]);
  return rows[0];
};

export const listCourses = async (anio = null) => {
  let query = 'SELECT * FROM cursos';
  const values = [];

  if (anio) {
    query += ' WHERE anio = $1';
    values.push(anio);
  }

  query += ' ORDER BY anio DESC, nombre ASC';
  const { rows } = await pool.query(query, values);
  return rows;
};