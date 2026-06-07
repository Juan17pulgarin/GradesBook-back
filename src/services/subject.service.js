import * as subjectRepository from '../repositories/subject.repository.js';
import { ESTADOS_MATERIA } from '../utils/constants.js';

export const createAcademicStructure = async (subjectData) => {
  const existingSubject = await subjectRepository.findSubjectByName(subjectData.name, subjectData.institucion_id);

  if (existingSubject) {
    throw new Error('SUBJECT_ALREADY_EXISTS');
  }

  const newSubject = {
    nombre: subjectData.name,
    institucion_id: subjectData.institucion_id,
    estado: subjectData.status || ESTADOS_MATERIA.ACTIVA
  };

  return await subjectRepository.createSubject(newSubject);
};

export const getSubjectsList = async (institucion_id) => {
  return await subjectRepository.listSubjects({
    estado: ESTADOS_MATERIA.ACTIVA
  }, institucion_id);
};

export const listSubjectsByStudent = async (estudiante_id) => {
    return await subjectRepository.listSubjectsByStudent(estudiante_id);
};

export const getSubjectsWithoutAcademicLoad = async (institucion_id) => {
  return await subjectRepository.listSubjectsWithoutAcademicLoad(
    institucion_id
  );
};

export const disableSubject = async (id, institucion_id, activo) => {
  const subject = await subjectRepository.findSubjectById(id, institucion_id);

  if (!subject) {
    throw new Error('SUBJECT_NOT_FOUND');
  }

  const estado = activo ? ESTADOS_MATERIA.ACTIVA : ESTADOS_MATERIA.INACTIVA;

  return await subjectRepository.updateSubject(id, { estado });
};

export const getInactiveSubjectsList = async (institucion_id) => {
  return await subjectRepository.listInactiveSubjects(institucion_id);
};