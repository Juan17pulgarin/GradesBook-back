import * as academicLoadRepository from '../repositories/load.repository.js';

export const createAcademicLoad = async (data) => {

    // validar docente
    const teacher = await academicLoadRepository.findTeacherById(data.docente_id);
    if (!teacher) {
        throw new Error('TEACHER_NOT_FOUND');
    }

    // validar curso
    const course = await academicLoadRepository.findCourseById(data.curso_id);
    if (!course) {
        throw new Error('COURSE_NOT_FOUND');
    }

    // validar materia
    const subject = await academicLoadRepository.findSubjectById(data.materia_id);
    if (!subject) {
        throw new Error('SUBJECT_NOT_FOUND');
    }

    // validar duplicado
    const existingLoad =
        await academicLoadRepository.findByCourseAndSubject(
            data.curso_id,
            data.materia_id
        );
    if (existingLoad) {
        throw new Error('SUBJECT_ALREADY_ASSIGNED');
    }
    return await academicLoadRepository.createAcademicLoad(data);
};

export const listAcademicLoads = async () => {
    return await academicLoadRepository.listAcademicLoads();
};

export const updateAcademicLoad = async (id, data) => {

    const academicLoad = await academicLoadRepository.findAcademicLoadById(id);

    if (!academicLoad) {
        throw new Error('ACADEMIC_LOAD_NOT_FOUND');
    }

    // usar datos actuales si no vienen nuevos
    const docente_id = data.docente_id || academicLoad.docente_id;
    const curso_id = data.curso_id || academicLoad.curso_id;
    const materia_id = data.materia_id || academicLoad.materia_id;

    // validar docente
    const teacher = await academicLoadRepository.findTeacherById(docente_id);
    if (!teacher) {
        throw new Error('TEACHER_NOT_FOUND');
    }

    // validar curso
    const course = await academicLoadRepository.findCourseById(curso_id);
    if (!course) {
        throw new Error('COURSE_NOT_FOUND');
    }

    // validar materia
    const subject = await academicLoadRepository.findSubjectById(materia_id);
    if (!subject) {
        throw new Error('SUBJECT_NOT_FOUND');
    }

    // validar duplicado
    const existingLoad = await academicLoadRepository.findByCourseAndSubject(curso_id, materia_id);
    if (existingLoad && existingLoad.id !== parseInt(id)) {
        throw new Error('SUBJECT_ALREADY_ASSIGNED');
    }

    return await academicLoadRepository.updateAcademicLoad(id, data);
};