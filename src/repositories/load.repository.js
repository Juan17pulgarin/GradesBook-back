import prisma from '../config/prisma.js';
import { ROLES, ESTADOS_CURSO, ESTADOS_MATERIA } from '../utils/constants.js';

export const createAcademicLoad = async (data) => {
    return await prisma.carga_academica.create({
        data: {
            docente_id: parseInt(data.docente_id),
            curso_id: parseInt(data.curso_id),
            materia_id: parseInt(data.materia_id)
        }
    });
};

export const findExistingAcademicLoad = async (docente_id, curso_id, materia_id) => {
    return await prisma.carga_academica.findFirst({
        where: {
            docente_id: parseInt(docente_id),
            curso_id: parseInt(curso_id),
            materia_id: parseInt(materia_id)
        }
    });
};

export const findTeacherById = async (id, institucion_id) => {
    return await prisma.usuarios.findFirst({
        where: {
            id: parseInt(id),
            tipo: ROLES.DOCENTE,
            activo: true,
            institucion_id: parseInt(institucion_id)
        }
    });
};

export const findCourseById = async (id, institucion_id) => {
    return await prisma.cursos.findFirst({
        where: {
            id: parseInt(id),
            estado: ESTADOS_CURSO.ACTIVO,
            institucion_id: parseInt(institucion_id)
        }
    });
};

export const findSubjectById = async (id, institucion_id) => {
    return await prisma.materias.findFirst({
        where: {
            id: parseInt(id),
            estado: ESTADOS_MATERIA.ACTIVA,
            institucion_id: parseInt(institucion_id)
        }
    });
};

export const listAcademicLoads = async (institucion_id) => {
    return await prisma.carga_academica.findMany({
        where: { cursos: { institucion_id: parseInt(institucion_id) } },
        include: {
            usuarios: {
                select: { nombres: true, apellidos: true, email: true }
            },
            cursos: true,
            materias: true
        }
    });
};

export const findAcademicLoadById = async (id, institucion_id) => {
    const whereClause = { id: parseInt(id) };
    if (institucion_id) {
        whereClause.cursos = { institucion_id: parseInt(institucion_id) };
    }

    return await prisma.carga_academica.findFirst({
        where: whereClause
    });
};

export const findByCourseAndSubject = async (curso_id, materia_id) => {
    return await prisma.carga_academica.findFirst({
        where: {
            curso_id: parseInt(curso_id),
            materia_id: parseInt(materia_id)
        }
    });

};

export const listStudentsByAcademicLoad = async (carga_academica_id) => {

    const academicLoad = await prisma.carga_academica.findUnique({
        where: {
            id: parseInt(carga_academica_id)
        }
    });

    return await prisma.matriculas.findMany({
        where: {
            curso_id: academicLoad.curso_id
        },
        include: {
            usuarios: {
                select: {
                    id: true,
                    nombres: true,
                    apellidos: true,
                    documento: true
                }
            }
        }
    });

};

export const listAcademicLoadsByTeacher = async (docente_id) => {
    return await prisma.carga_academica.findMany({
        where: {
            docente_id: parseInt(docente_id)
        },

        include: {
            materias: true,
            cursos: true
        }
    });
};

export const updateAcademicLoad = async (id, data) => {
    return await prisma.carga_academica.update({
        where: {
            id: parseInt(id)
        },

        data: {
            ...(data.docente_id && {
                docente_id: parseInt(data.docente_id)
            }),
            ...(data.curso_id && {
                curso_id: parseInt(data.curso_id)
            }),
            ...(data.materia_id && {
                materia_id:parseInt(data.materia_id)
            })
        }
    });
};