import * as courseRepository from '../repositories/course.repository.js';
import * as subjectRepository from '../repositories/subject.repository.js';
import { ESTADOS_CURSO } from '../utils/constants.js';

export const createCourse = async (courseData) => {
  const existingCourse = await courseRepository.findCourseByNameAndYear(
    courseData.nombre,
    courseData.anio,
    courseData.institucion_id
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

export const listCourses = async (anio, institucion_id) => {
  return await courseRepository.listCourses(anio, institucion_id);
};

export const getAvailableCoursesForSubject = async (materia_id, institucion_id) => {

  const subject = await subjectRepository.findSubjectById(materia_id, institucion_id);

  if (!subject) {
    throw new Error('SUBJECT_NOT_FOUND');
  }

  return await courseRepository.getAvailableCoursesForSubject(materia_id, institucion_id);
};

export const updateCourse = async (id, courseData, institucion_id) => {

  const course = await courseRepository.findCourseById(id, institucion_id);

  if (!course) {
    throw new Error('COURSE_NOT_FOUND');
  }

  // Si cambia nombre o año validar duplicado
  const nombre = courseData.nombre || course.nombre;
  const anio = courseData.anio || course.anio;

  const existingCourse = await courseRepository.findCourseByNameAndYear(
      nombre,
      anio,
      institucion_id
    );

  if (existingCourse && existingCourse.id !== parseInt(id)) {
    throw new Error('COURSE_ALREADY_EXISTS');
  }

  return await courseRepository.updateCourse(id, courseData);
};