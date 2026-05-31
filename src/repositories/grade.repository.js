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

export const findActivityById = async (actividad_id, institucion_id) => {
    return await prisma.actividades.findFirst({
        where: {
            id: parseInt(actividad_id),
            carga_academica: {
                cursos: { institucion_id: parseInt(institucion_id) }
            }
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

export const findAcademicLoadById = async (carga_academica_id) => {

    return await prisma.carga_academica.findUnique({
        where: {
            id: parseInt(carga_academica_id)
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

export const getStudentAverage = async (estudiante_id, carga_academica_id, periodo_id) => {

    const grades = await prisma.notas.findMany({
        where: {
            estudiante_id: parseInt(estudiante_id),
            actividades: {
                carga_academica_id: parseInt(carga_academica_id),
                periodo_id: parseInt(periodo_id)
            }
        },

        include: {
            actividades: true
        }
    });

    return grades;
};

export const getStudentGradesForAverageByPeriod = async (estudiante_id, periodo_id) => {
    return await prisma.notas.findMany({
        where: {
            estudiante_id: parseInt(estudiante_id),
            actividades: {
                periodo_id: parseInt(periodo_id)
            }
        },
        include: {
            actividades: {
                include: {
                    periodos: true,
                    carga_academica: {
                        include: {
                            materias: true
                        }
                    }
                }
            }
        }
    });
};

export const getStudentGradesForGeneralAverage = async (estudiante_id) => {
    return await prisma.notas.findMany({
        where: {
            estudiante_id: parseInt(estudiante_id)
        },
        include: {
            actividades: {
                include: {
                    periodos: true,
                    carga_academica: {
                        include: {
                            materias: true
                        }
                    }
                }
            }
        }
    });
};

export const updateGrade = async (id, gradeData) => {
    return await prisma.notas.update({
        where: {
            id: parseInt(id)
        },
        data: {
            nota: gradeData.nota,
            observacion: gradeData.observacion
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

