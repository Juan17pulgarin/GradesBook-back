import * as academicLoadRepository from '../repositories/load.repository.js';

export const createAcademicLoad = async (data) => {

    const teacher = await academicLoadRepository.findTeacherById(data.docente_id, data.institucion_id);
    if (!teacher) throw new Error('TEACHER_NOT_FOUND');

    const course = await academicLoadRepository.findCourseById(data.curso_id, data.institucion_id);
    if (!course) throw new Error('COURSE_NOT_FOUND');

    const subject = await academicLoadRepository.findSubjectById(data.materia_id, data.institucion_id);
    if (!subject) throw new Error('SUBJECT_NOT_FOUND');

    const existingLoad = await academicLoadRepository.findByCourseAndSubject(data.curso_id, data.materia_id);
    if (existingLoad) throw new Error('SUBJECT_ALREADY_ASSIGNED');

    return await academicLoadRepository.createAcademicLoad(data);
};

export const listAcademicLoads = async (institucion_id) => {
    return await academicLoadRepository.listAcademicLoads(institucion_id);
};

export const listStudentsByAcademicLoad = async (carga_academica_id, docente_id) => {

    const academicLoad = await academicLoadRepository.findAcademicLoadById(carga_academica_id);

    if (!academicLoad) {
        throw new Error('ACADEMIC_LOAD_NOT_FOUND');
    }

    if (academicLoad.docente_id !== parseInt(docente_id)) {
        throw new Error('UNAUTHORIZED_ACADEMIC_LOAD');
    }

    return await academicLoadRepository.listStudentsByAcademicLoad(carga_academica_id);

};

export const listAcademicLoadsByTeacher = async (docente_id) => {
    
    return await academicLoadRepository.listAcademicLoadsByTeacher(docente_id);

};

export const updateAcademicLoad = async (id, data) => {

    const academicLoad = await academicLoadRepository.findAcademicLoadById(id);

    if (!academicLoad) {
        throw new Error('ACADEMIC_LOAD_NOT_FOUND');
    }

    const docente_id = data.docente_id || academicLoad.docente_id;
    const curso_id = data.curso_id || academicLoad.curso_id;
    const materia_id = data.materia_id || academicLoad.materia_id;

    const institucion_id = data.institucion_id;

    const teacher = await academicLoadRepository.findTeacherById(docente_id, institucion_id);
    if (!teacher && data.docente_id) throw new Error('TEACHER_NOT_FOUND');

    const course = await academicLoadRepository.findCourseById(curso_id, institucion_id);
    if (!course && data.curso_id) throw new Error('COURSE_NOT_FOUND');

    const subject = await academicLoadRepository.findSubjectById(materia_id, institucion_id);
    if (!subject && data.materia_id) throw new Error('SUBJECT_NOT_FOUND');

    if (data.curso_id || data.materia_id) {
        const existingLoad = await academicLoadRepository.findByCourseAndSubject(curso_id, materia_id);
        if (existingLoad && existingLoad.id !== parseInt(id)) {
            throw new Error('SUBJECT_ALREADY_ASSIGNED');
        }
    }

    return await academicLoadRepository.updateAcademicLoad(id, data);
};
