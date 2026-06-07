import prisma from '../config/prisma.js';

export const findSubjectByName = async (nombre, institucion_id) => {
  return await prisma.materias.findFirst({
    where: {
      nombre,
      institucion_id: parseInt(institucion_id)
    }
  });
};

export const findSubjectById = async (id, institucion_id) => {
  return await prisma.materias.findFirst({
    where: {
      id: parseInt(id),
      institucion_id: parseInt(institucion_id)
    }
  });
};

export const createSubject = async (subjectData) => {
  return await prisma.materias.create({
    data: {
      nombre: subjectData.nombre,
      estado: subjectData.estado,
      institucion_id: parseInt(subjectData.institucion_id)
    }
  });
};

export const listSubjects = async (where = {}, institucion_id) => {
  return await prisma.materias.findMany({
    where: {
      ...where,
      institucion_id: parseInt(institucion_id)
    },
    orderBy: {
      nombre: 'asc'
    }
  });
};

export const listSubjectsByStudent = async (estudiante_id) => {
    const enrollments = await prisma.matriculas.findMany({
        where: {
            estudiante_id: parseInt(estudiante_id)
        },
        select: {
            curso_id: true
        }
    });

    const courseIds = enrollments.map(enrollment => enrollment.curso_id);

    return await prisma.carga_academica.findMany({
        where: {
            curso_id: {
                in: courseIds
            }
        },
        include: {
            materias: true,
            cursos: true,
            usuarios: {
                select: {
                    nombres: true,
                    apellidos: true
                }
            }
        }
    });
};

export const listSubjectsWithoutAcademicLoad = async (institucion_id) => {
  return await prisma.materias.findMany({
    where: {
      institucion_id: parseInt(institucion_id),
      estado: 'ACTIVA',
      carga_academica: {
        none: {}
      }
    },
    orderBy: {
      nombre: 'asc'
    }
  });
};

export const listInactiveSubjects = async (institucion_id) => {
  return await prisma.materias.findMany({
    where: {
      estado: 'INACTIVA',
      institucion_id: parseInt(institucion_id)
    },
    orderBy: {
      nombre: 'asc'
    }
  });
};

export const updateSubject = async (id, subjectData) => {
  return await prisma.materias.update({
    where: { id: parseInt(id) },
    data: subjectData
  });
};
