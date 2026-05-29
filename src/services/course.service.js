import * as courseRepository from '../repositories/course.repository.js';
import { ESTADOS_CURSO } from '../utils/constants.js';

export const createCourse = async (courseData, institucion_id) => {
  const existingCourse = await courseRepository.findCourseByNameAndYear(
    courseData.nombre, 
    courseData.anio,
    institucion_id 
  );

  if (existingCourse) {
    throw new Error('COURSE_ALREADY_EXISTS');
  }

  const newCourse = {
    ...courseData,
    institucion_id, 
    estado: courseData.estado || ESTADOS_CURSO.ACTIVO
  };

  return await courseRepository.createCourse(newCourse);
};

export const listCourses = async (anio, institucion_id) => {
  return await courseRepository.listCourses(anio, institucion_id);
};