import * as activityRepository from '../repositories/activity.repository.js';

export const createActivity = async (activityData, docente_id) => {
    const { institucion_id } = activityData;

    const academicLoad = await activityRepository.findAcademicLoadById(activityData.carga_academica_id, institucion_id);
    if (!academicLoad) throw new Error('ACADEMIC_LOAD_NOT_FOUND');

    if (academicLoad.docente_id !== parseInt(docente_id)) {
        throw new Error('UNAUTHORIZED_ACADEMIC_LOAD');
    }

    const period = await activityRepository.findPeriodById(activityData.periodo_id, institucion_id);
    if (!period) throw new Error('PERIOD_NOT_FOUND');

    const existingActivity = await activityRepository.findActivityByName(
        activityData.nombre,
        activityData.carga_academica_id,
        activityData.periodo_id
    );

    if (existingActivity) throw new Error('ACTIVITY_ALREADY_EXISTS');

    const currentPercentage = await activityRepository.getTotalPercentageByPeriod(
        activityData.carga_academica_id,
        activityData.periodo_id
    );

    const newTotal = parseFloat(currentPercentage) + parseFloat(activityData.porcentaje);

    if (newTotal > 100) throw new Error('PERCENTAGE_LIMIT_EXCEEDED');

    return await activityRepository.createActivity(activityData);
};

export const listActivitiesByTeacher = async (docente_id) => {
    return await activityRepository.listActivitiesByTeacher(docente_id);
};

export const listActivitiesByStudent = async (estudiante_id) => {
    return await activityRepository.listActivitiesByStudent(estudiante_id);
};