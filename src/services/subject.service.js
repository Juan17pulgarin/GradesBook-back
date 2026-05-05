import * as subjectRepository from '../repositories/subject.repository.js';
import { ESTADOS_MATERIA } from '../utils/constants.js';

export const createAcademicStructure = async (subjectData) => {
  const existingSubject = await subjectRepository.findSubjectByName(subjectData.name);

  if (existingSubject) {
    throw new Error('SUBJECT_ALREADY_EXISTS');
  }

  const newSubject = {
    nombre: subjectData.name,
    estado: subjectData.status || ESTADOS_MATERIA.ACTIVA
  };

  return await subjectRepository.createSubject(newSubject);
};

export const getSubjectsList = async () => {
  return await subjectRepository.listSubjects({
    estado: ESTADOS_MATERIA.ACTIVA
  });
};

export const disableSubject = async (id) => {
  const subject = await subjectRepository.findSubjectById(id);

  if (!subject) {
    throw new Error('SUBJECT_NOT_FOUND');
  }

  return await subjectRepository.updateSubject(id, {
    estado: ESTADOS_MATERIA.INACTIVA
  });
};