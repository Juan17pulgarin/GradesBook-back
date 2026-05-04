import prisma from '../config/prisma.js';

export const createCourse = async (courseData) => {
  return await prisma.cursos.create({
    data: {
      nombre: courseData.nombre,
      anio: parseInt(courseData.anio),
      capacidad_maxima: courseData.capacidad_maxima ? parseInt(courseData.capacidad_maxima) : null,
      estado: courseData.estado
    }
  });
};

export const findCourseByNameAndYear = async (nombre, anio) => {
  return await prisma.cursos.findFirst({
    where: {
      nombre: nombre,
      anio: parseInt(anio)
    }
  });
};

export const listCourses = async (anio = null) => {
  return await prisma.cursos.findMany({
    where: {
      ...(anio && { anio: parseInt(anio) })
    },
    orderBy: [
      { anio: 'desc' },
      { nombre: 'asc' }
    ]
  });
};