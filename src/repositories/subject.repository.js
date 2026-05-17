import prisma from '../config/prisma.js';

export const findSubjectByName = async (nombre) => {
  return await prisma.materias.findFirst({
    where: { nombre }
  });
};

export const findSubjectById = async (id) => {
  return await prisma.materias.findUnique({
    where: { id: parseInt(id) }
  });
};

export const createSubject = async (subjectData) => {
  return await prisma.materias.create({
    data: subjectData
  });
};

export const listSubjects = async (where = {}) => {
  return await prisma.materias.findMany({
    where,
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

export const updateSubject = async (id, subjectData) => {
  return await prisma.materias.update({
    where: { id: parseInt(id) },
    data: subjectData
  });
};