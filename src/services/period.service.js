import * as periodRepository from '../repositories/period.repository.js';

export const createPeriod = async (periodData) => {
    const existingPeriod =
        await periodRepository.findPeriodByName(
        periodData.nombre
        );

    if (existingPeriod) {
        throw new Error('PERIOD_ALREADY_EXISTS');
    }

    // validar fechas
    const startDate = new Date(periodData.fecha_inicio);
    const endDate = new Date(periodData.fecha_fin);

    if (startDate >= endDate) {
        throw new Error('INVALID_DATES');
    }

    return await periodRepository.createPeriod(periodData);
};

export const listPeriods = async () => {
    return await periodRepository.listPeriods();
};