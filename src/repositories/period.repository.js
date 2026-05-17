import prisma from '../config/prisma.js';

export const createPeriod = async (periodData) => {
    return await prisma.periodos.create({
        data: {
            nombre: periodData.nombre,
            fecha_inicio: new Date(periodData.fecha_inicio),
            fecha_fin: new Date(periodData.fecha_fin)
        }
    });
};

export const findPeriodByName = async (nombre) => {
    return await prisma.periodos.findFirst({
        where: {
            nombre
        }
    });
};

export const listPeriods = async () => {
    return await prisma.periodos.findMany({
        orderBy: {
            fecha_inicio: 'asc'
        }
    });
};