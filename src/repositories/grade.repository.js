import prisma from '../config/prisma.js';

export const createGrade = async (gradeData) => {
    return await prisma.notas.create({
        data: {
            estudiante_id: parseInt(gradeData.estudiante_id),
            actividad_id: parseInt(gradeData.actividad_id),
            nota: gradeData.nota,
            observacion: gradeData.observacion
        }
    });
};

export const findGradeById = async (id) => {
    return await prisma.notas.findUnique({
        where: {
            id: parseInt(id)
        },
        include: {
            usuarios: true,
            actividades: {
                include: {
                    carga_academica: true
                }
            }
        }
    });
};

export const findExistingGrade = async (estudiante_id, actividad_id) => {
    return await prisma.notas.findFirst({
        where: {
            estudiante_id: parseInt(estudiante_id),
            actividad_id: parseInt(actividad_id)
        }
    });
};

export const findActivityById = async (actividad_id) => {
    return await prisma.actividades.findUnique({
        where: {
            id: parseInt(actividad_id)
        },
        include: {
            carga_academica: true
        }
    });
};

export const findEnrollment = async (estudiante_id, curso_id) => {  
    return await prisma.matriculas.findFirst({
        where: {
            estudiante_id: parseInt(estudiante_id),
            curso_id: parseInt(curso_id)
        }
    });
};

export const listGradesByActivity = async (actividad_id) => {
    return await prisma.notas.findMany({
        where: {
            actividad_id: parseInt(actividad_id)
        },
        include: {
            usuarios: {
                select: {
                    nombres: true,
                    apellidos: true,
                    documento: true
                }
            }
        }
    });
};

export const listGradesByStudent = async (estudiante_id) => {
    return await prisma.notas.findMany({
        where: {
            estudiante_id:parseInt(estudiante_id)
        },

        include: {
            actividades: {
                include: {
                    carga_academica: {
                        include: {
                            materias: true,
                            cursos: true
                        }
                    }
                }
            }
        }
    });
};

export const deleteGrade = async (id) => {
    return await prisma.notas.delete({
        where: {
            id: parseInt(id)
        }
    });
};

