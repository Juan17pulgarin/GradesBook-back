import prisma from '../config/prisma.js';

export const createCourse = async (courseData) => {
  return await prisma.cursos.create({
    data: {
      nombre: courseData.nombre,
      anio: parseInt(courseData.anio),
      capacidad_maxima: courseData.capacidad_maxima ? parseInt(courseData.capacidad_maxima) : null,
      estado: courseData.estado,
      institucion_id: parseInt(courseData.institucion_id) 
    }
  });
};

export const findCourseByNameAndYear = async (nombre, anio, institucion_id) => {
  return await prisma.cursos.findFirst({
    where: {
      nombre: nombre,
      anio: parseInt(anio),
      institucion_id: parseInt(institucion_id) 
    }
  });
};

export const listCourses = async (anio = null, institucion_id) => {
  return await prisma.cursos.findMany({
    where: {
      institucion_id: parseInt(institucion_id), 
      ...(anio && { anio: parseInt(anio) })
    },
    orderBy: [
      { anio: 'desc' },
      { nombre: 'asc' }
    ]
  });
};