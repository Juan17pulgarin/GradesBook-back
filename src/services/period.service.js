import * as periodRepository from '../repositories/period.repository.js';

export const createPeriod = async (periodData) => {

    const existingPeriod = await periodRepository.findPeriodByName(periodData.nombre, periodData.institucion_id);

    if (existingPeriod) {
        throw new Error('PERIOD_ALREADY_EXISTS');
    }

    const startDate = new Date(periodData.fecha_inicio);
    const endDate = new Date(periodData.fecha_fin);

    if (startDate >= endDate) {
        throw new Error('INVALID_DATES');
    }

    const year = startDate.getFullYear();
    const totalPeriods = await periodRepository.countPeriodsByYear(year, periodData.institucion_id);

    if (totalPeriods >= 4) {
        throw new Error('MAX_PERIODS_EXCEEDED');
    }

    const differenceInMs = endDate - startDate;
    const differenceInDays = differenceInMs/(1000 * 60 * 60 * 24);

    if (differenceInDays < 60) {
        throw new Error('PERIOD_TOO_SHORT');
    }

    if (differenceInDays > 75) {
        throw new Error('PERIOD_TOO_LONG');
    }

    return await periodRepository.createPeriod(periodData);
};

export const listPeriods = async (institucion_id) => {
    return await periodRepository.listPeriods(institucion_id);
};
