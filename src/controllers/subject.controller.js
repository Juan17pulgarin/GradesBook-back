import * as subjectService from '../services/subject.service.js';
import { ESTADOS_MATERIA } from '../utils/constants.js';

export const createSubjectHandler = async (req, res) => {
  try {
    const { name, status } = req.body;

    if (!name) {
      return res.status(400).json({ message: "El nombre de la materia es obligatorio" });
    }

    const result = await subjectService.createAcademicStructure({ 
      name, 
      status, 
      institucion_id: req.user.institucion_id
    });
    
    res.status(201).json({
      message: "Estructura académica de la materia creada exitosamente",
      data: result
    });
  } catch (error) {
    const statusCode = error.message === 'SUBJECT_ALREADY_EXISTS' ? 409 : 500;
    const message = error.message === 'SUBJECT_ALREADY_EXISTS' ? "La materia ya existe" : "Error interno del servidor";
    res.status(statusCode).json({ message });
  }
};

export const listSubjectsHandler = async (req, res) => {
  try {
    const subjects = await subjectService.getSubjectsList(req.user.institucion_id);
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las materias", error: error.message });
  }
};

export const listStudentSubjectsHandler = async (req, res) => {
  try {
    const subjects = await subjectService.listSubjectsByStudent(req.user.id);
    res.json(subjects);
  } catch (error) {
    const statusCode = 500;
    const message = "Error al listar las materias del estudiante";
    res.status(statusCode).json({message});
  }
};

export const listSubjectsWithoutAcademicLoadHandler = async (req, res) => {
  try {

    const subjects = await subjectService.getSubjectsWithoutAcademicLoad(req.user.institucion_id);
    res.json(subjects);

  } catch (error) {

    res.status(500).json({
      message: 'Error al listar materias sin carga académica',
      error: error.message
    });

  }
};

export const deleteSubjectHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { activo } = req.body;

    if (typeof activo !== 'boolean') {
      return res.status(400).json({ message: 'El campo activo es obligatorio y debe ser un booleano' });
    }

    const result = await subjectService.disableSubject(id, req.user.institucion_id, activo);
    const message = activo ? 'Materia activada exitosamente' : 'Materia desactivada exitosamente';
    res.json({ message, data: result });
  } catch (error) {
    const statusCode = error.message === 'SUBJECT_NOT_FOUND' ? 404 : 500;
    const message = error.message === 'SUBJECT_NOT_FOUND' ? "La materia no existe" : "Error al actualizar el estado de la materia";
    res.status(statusCode).json({ message });
  }
};

export const listInactiveSubjectsHandler = async (req, res) => {
  try {
    const subjects = await subjectService.getInactiveSubjectsList(req.user.institucion_id);
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las materias inactivas", error: error.message });
  }
};