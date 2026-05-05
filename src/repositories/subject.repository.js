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

export const updateSubject = async (id, subjectData) => {
  return await prisma.materias.update({
    where: { id: parseInt(id) },
    data: subjectData
  });
};