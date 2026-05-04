import * as courseRepository from '../repositories/course.repository.js';
import { ESTADOS_CURSO } from '../utils/constants.js';

export const createCourse = async (courseData) => {
  const existingCourse = await courseRepository.findCourseByNameAndYear(
    courseData.nombre, 
    courseData.anio
  );

  if (existingCourse) {
    throw new Error('COURSE_ALREADY_EXISTS');
  }

  const newCourse = {
    ...courseData,
    estado: courseData.estado || ESTADOS_CURSO.ACTIVO
  };

  return await courseRepository.createCourse(newCourse);
};

export const listCourses = async (anio) => {
  return await courseRepository.listCourses(anio);
};