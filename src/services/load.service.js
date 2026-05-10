import * as academicLoadRepository from '../repositories/load.repository.js';

export const createAcademicLoad = async (data) => {

    // validar docente
    const teacher = await academicLoadRepository.findTeacherById(
        data.docente_id
    );

    if (!teacher) {
        throw new Error('TEACHER_NOT_FOUND');
    }

    // validar curso
    const course = await academicLoadRepository.findCourseById(
        data.curso_id
    );

    if (!course) {
        throw new Error('COURSE_NOT_FOUND');
    }

    // validar materia
    const subject = await academicLoadRepository.findSubjectById(
        data.materia_id
    );

    if (!subject) {
        throw new Error('SUBJECT_NOT_FOUND');
    }

    // validar duplicado
    const existingLoad =
        await academicLoadRepository.findExistingAcademicLoad(
        data.docente_id,
        data.curso_id,
        data.materia_id
        );

    if (existingLoad) {
        throw new Error('ACADEMIC_LOAD_ALREADY_EXISTS');
    }

    return await academicLoadRepository.createAcademicLoad(data);
};

export const listAcademicLoads = async () => {
    return await academicLoadRepository.listAcademicLoads();
};