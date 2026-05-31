import prisma from '../config/prisma.js';

export const createPeriod = async (periodData) => {
    return await prisma.periodos.create({
        data: {
            nombre: periodData.nombre,
            fecha_inicio: new Date(periodData.fecha_inicio),
            fecha_fin: new Date(periodData.fecha_fin),
            institucion_id: parseInt(periodData.institucion_id)
        }
    });
};

export const listPeriods = async (institucion_id) => {
    return await prisma.periodos.findMany({
        where: {
            institucion_id: parseInt(institucion_id)
        },
        orderBy: {
            fecha_inicio: 'asc'
        }
    });
};

export const countPeriodsByYear = async (year, institucion_id) => {
    const startDate = new Date(`${year}-01-01`);
    const endDate = new Date(`${year}-12-31`);

    return await prisma.periodos.count({
        where: {
            institucion_id: parseInt(institucion_id),
            fecha_inicio: {
                gte: startDate
            },
            fecha_fin: {
                lte: endDate
            }
        }
    });
};

export const findOverlappingPeriod = async (fecha_inicio, fecha_fin, institucion_id, excludeId = null) => {
    return await prisma.periodos.findFirst({
        where: {
            institucion_id: parseInt(institucion_id),
            ...(excludeId && { id: { not: parseInt(excludeId) } }), 
            OR: [
                {
                    fecha_inicio: { lte: new Date(fecha_fin) },
                    fecha_fin: { gte: new Date(fecha_inicio) }
                }
            ]
        }
    });
};

export const updatePeriod = async (id, periodData) => {
    return await prisma.periodos.update({
        where: {
            id: parseInt(id)
        },
        data: {
            fecha_inicio: new Date(periodData.fecha_inicio),
            fecha_fin: new Date(periodData.fecha_fin)
        }
    });
};

export const findPeriodById = async (id) => {
    return await prisma.periodos.findUnique({
        where: {
            id: parseInt(id)
        }
    });
};