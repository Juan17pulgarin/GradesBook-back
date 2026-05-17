import prisma from '../config/prisma.js';

export const createActivity = async (activityData) => {
    return await prisma.actividades.create({
        data: {
            carga_academica_id: parseInt(activityData.carga_academica_id),
            periodo_id: parseInt(activityData.periodo_id),
            nombre: activityData.nombre,
            descripcion: activityData.descripcion,
            porcentaje: activityData.porcentaje,
            fecha: new Date(activityData.fecha)
        }
    });
};

export const findAcademicLoadById = async (id) => {
    return await prisma.carga_academica.findUnique({
        where: {
            id: parseInt(id)
        },

    });
};

export const findPeriodById = async (id) => {
    return await prisma.periodos.findUnique({
        where: {
            id: parseInt(id)
        }
    });
};

export const listActivitiesByTeacher = async (docente_id) => {
    return await prisma.actividades.findMany({
        where: {
            carga_academica: {
                docente_id: parseInt(docente_id)
            }
        },
        include: {
            carga_academica: {
                include: {
                cursos: true,
                materias: true
                }
            },
            periodos: true
        }
    });
};

export const listActivitiesByStudent = async (estudiante_id) => {
    return await prisma.actividades.findMany({
        where: {
            carga_academica: {
                curso_id: {
                    in: (
                        await prisma.matriculas.findMany({
                            where: {
                                estudiante_id:
                                    parseInt(estudiante_id)
                            },
                            select: {
                                curso_id: true
                            }
                        })
                    ).map(m => m.curso_id)
                }
            }
        },

        include: {
            carga_academica: {
                include: {
                    cursos: true,
                    materias: true
                }
            },
            periodos: true
        }
    });
};

// Validar que el porcentaje total de las actividades no supere el 100% 
export const getTotalPercentageByPeriod = async (carga_academica_id, periodo_id) => {

    const result = await prisma.actividades.aggregate({
        where: {
            carga_academica_id: parseInt(carga_academica_id),
            periodo_id: parseInt(periodo_id)
        },

        _sum: {
            porcentaje: true
        }
    });

    return result._sum.porcentaje || 0;
};

// Validar que no se creen tareas con la misma información
export const findActivityByName = async (nombre, carga_academica_id, periodo_id) => {
    return await prisma.actividades.findFirst({
        where: {
            nombre,
            carga_academica_id:
                parseInt(carga_academica_id),

            periodo_id:
                parseInt(periodo_id)
        }
    });
};

