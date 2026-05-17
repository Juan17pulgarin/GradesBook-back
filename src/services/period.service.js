import * as periodRepository from '../repositories/period.repository.js';

export const createPeriod = async (periodData) => {

    const existingPeriod = await periodRepository.findPeriodByName(periodData.nombre);

    if (existingPeriod) {
        throw new Error('PERIOD_ALREADY_EXISTS');
    }

    // validar fechas
    const startDate = new Date(periodData.fecha_inicio);
    const endDate = new Date(periodData.fecha_fin);

    if (startDate >= endDate) {
        throw new Error('INVALID_DATES');
    }

    // obtener año
    const year = startDate.getFullYear();

    // validar máximo 4 periodos
    const totalPeriods = await periodRepository.countPeriodsByYear(year);

    if (totalPeriods >= 4) {
        throw new Error('MAX_PERIODS_EXCEEDED');
    }

    // calcular duración
    const differenceInMs = endDate - startDate;

    const differenceInDays = differenceInMs/(1000 * 60 * 60 * 24);

    // mínimo 2 meses aprox
    if (differenceInDays < 60) {
        throw new Error('PERIOD_TOO_SHORT');
    }

    // máximo 2.5 meses aprox
    if (differenceInDays > 75) {
        throw new Error('PERIOD_TOO_LONG');
    }

    return await periodRepository.createPeriod(periodData);
};

export const listPeriods = async () => {
    return await periodRepository.listPeriods();
};