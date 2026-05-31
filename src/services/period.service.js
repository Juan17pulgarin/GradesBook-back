import * as periodRepository from '../repositories/period.repository.js';

export const createPeriod = async (periodData) => {

    const startDate = new Date(periodData.fecha_inicio);
    const endDate = new Date(periodData.fecha_fin);

    if (startDate >= endDate) throw new Error('INVALID_DATES');

    const overlapping = await periodRepository.findOverlappingPeriod(
        periodData.fecha_inicio,
        periodData.fecha_fin,
        periodData.institucion_id
    );
    if (overlapping) throw new Error('PERIOD_OVERLAPPING');

    const year = startDate.getFullYear();
    const totalPeriods = await periodRepository.countPeriodsByYear(year, periodData.institucion_id);
    if (totalPeriods >= 4) throw new Error('MAX_PERIODS_EXCEEDED');

    const differenceInDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
    if (differenceInDays < 60) throw new Error('PERIOD_TOO_SHORT');
    if (differenceInDays > 75) throw new Error('PERIOD_TOO_LONG');

    // nombre generado automáticamente
    const nombre = `Periodo ${totalPeriods + 1}`;

    return await periodRepository.createPeriod({ ...periodData, nombre });
};

export const listPeriods = async (institucion_id) => {
    return await periodRepository.listPeriods(institucion_id);
};

export const updatePeriod = async (id, periodData, institucion_id) => {
    const period = await periodRepository.findPeriodById(id);

    if (!period) throw new Error('PERIOD_NOT_FOUND');

    if (period.institucion_id !== parseInt(institucion_id)) {
        throw new Error('UNAUTHORIZED_PERIOD');
    }

    const startDate = new Date(periodData.fecha_inicio);
    const endDate = new Date(periodData.fecha_fin);

    if (startDate >= endDate) throw new Error('INVALID_DATES');

    const overlapping = await periodRepository.findOverlappingPeriod(
        periodData.fecha_inicio,
        periodData.fecha_fin,
        institucion_id,
        id // excluir el periodo actual de la búsqueda
    );
    if (overlapping) throw new Error('PERIOD_OVERLAPPING');

    const differenceInDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
    if (differenceInDays < 60) throw new Error('PERIOD_TOO_SHORT');
    if (differenceInDays > 75) throw new Error('PERIOD_TOO_LONG');

    return await periodRepository.updatePeriod(id, periodData);
};
