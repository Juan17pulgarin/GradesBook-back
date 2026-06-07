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

export const getAvailableCoursesForSubject = async (materia_id, institucion_id) => {

  const assignedCourses = await prisma.carga_academica.findMany({
    where: {
      materia_id: parseInt(materia_id)
    },
    select: {
      curso_id: true
    }
  });

  const assignedCourseIds = assignedCourses.map(item => item.curso_id);

  return await prisma.cursos.findMany({
    where: {
      institucion_id: parseInt(institucion_id),
      estado: 'ACTIVO',
      id: {
        notIn: assignedCourseIds
      }
    },
    orderBy: {
      nombre: 'asc'
    }
  });
};

export const findCourseById = async (id, institucion_id) => {
  return await prisma.cursos.findFirst({
    where: {
      id: parseInt(id),
      institucion_id: parseInt(institucion_id)
    }
  });
};

export const updateCourse = async (id, data) => {
  return await prisma.cursos.update({
    where: {
      id: parseInt(id)
    },
    data: {
      ...(data.nombre && {
        nombre: data.nombre
      }),

      ...(data.anio && {
        anio: parseInt(data.anio)
      }),

      ...(data.capacidad_maxima && {
        capacidad_maxima: parseInt(data.capacidad_maxima)
      }),

      ...(data.estado && {
        estado: data.estado
      })
    }
  });
};