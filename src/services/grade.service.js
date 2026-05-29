import * as gradeRepository
from '../repositories/grade.repository.js';

export const createGrade = async (gradeData, docente_id) => {
    const { institucion_id } = gradeData;

    const activity = await gradeRepository.findActivityById(gradeData.actividad_id, institucion_id);
    if (!activity) throw new Error('ACTIVITY_NOT_FOUND');

    if (activity.carga_academica.docente_id !== docente_id) {
        throw new Error('UNAUTHORIZED_ACTIVITY');
    }

    const enrollment = await gradeRepository.findEnrollment(
        gradeData.estudiante_id,
        activity.carga_academica.curso_id
    );
    if (!enrollment) throw new Error('STUDENT_NOT_ENROLLED');

    const existingGrade = await gradeRepository.findExistingGrade(
        gradeData.estudiante_id,
        gradeData.actividad_id
    );
    if (existingGrade) throw new Error('GRADE_ALREADY_EXISTS');

    return await gradeRepository.createGrade(gradeData);
};

export const listGradesByActivity = async (actividad_id, docente_id) => {
    
    const activity = await gradeRepository.findActivityById(actividad_id);

    if (!activity) {
        throw new Error('ACTIVITY_NOT_FOUND');
    }

    if (activity.carga_academica.docente_id !== docente_id) {
        throw new Error('UNAUTHORIZED_ACTIVITY');
    }

    return await gradeRepository.listGradesByActivity(actividad_id);
};

export const listGradesByStudent = async (estudiante_id) => {
    
    return await gradeRepository.listGradesByStudent(estudiante_id);
};

export const deleteGrade = async (id, docente_id) => {
    const grade = await gradeRepository.findGradeById(id);

    if (!grade) {
        throw new Error('GRADE_NOT_FOUND');
    }

    if (grade.actividades.carga_academica.docente_id !== parseInt(docente_id)) {

        throw new Error('UNAUTHORIZED_GRADE');
    }

    return await gradeRepository.deleteGrade(id);
};